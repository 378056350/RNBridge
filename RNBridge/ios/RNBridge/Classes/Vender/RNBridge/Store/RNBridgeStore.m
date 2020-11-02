//
//  RNBridgeStore.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "RNBridgeStore.h"
#import "RNBridgeUtil.h"
#import "RNBridgeDownloadManager.h"
#import "RNBridgeConfig.h"
#import "NSArray+RNBridge.h"
#import <React/RCTBundleURLProvider.h>

#pragma mark - 声明
@interface RNBridgeStore ()

@property (nonatomic, strong) NSLock *lock;
@property (nonatomic, strong) NSLock *modelLock;
@property (nonatomic, strong) RNBridgeModel *model;
@property (nonatomic, strong) RNBridgeDownloadManager *download;
@property (nonatomic, strong) dispatch_queue_t queue;
@property (nonatomic, strong) NSMutableString *log;

@end


#pragma mark - 实现
@implementation RNBridgeStore

singleton_implementation(RNBridgeStore)


#pragma mark 初始化
- (instancetype)init {
    if (self = [super init]) {
        [self initEvent];
    }
    return self;
}

- (void)initEvent {
    @weakify(self)
    // 加载成功
    [[[[NSNotificationCenter defaultCenter] rac_addObserverForName:RCTJavaScriptDidLoadNotification object:nil] deliverOnMainThread] subscribeNext:^(NSNotification *x) {
        @strongify(self)
        // 加载完common
        if ([self.model loadCommonBundle] == false) {
            [self.model setLoadCommonBundle:true];
            [self install];
        }
        // 加载完business
        else {
//            NSLog(@"====================================");
//            NSLog(@"================ 安装完: %@", self.model.name);
//            NSLog(@"====================================");
            [self.model setLoadComplete:true];
            [self.model setUninstall:false];
            [self.model install];
            [[NSNotificationCenter defaultCenter] postNotificationName:_NotificationBridgeLoadComplete object:self.model];
            [self.modelLock unlock];
            if ([self installComplete]) {
                [self.lock unlock];
                [self consoleLog];
            }
        }
    }];
    // 加载失败
    [[[[NSNotificationCenter defaultCenter] rac_addObserverForName:RCTJavaScriptDidLoadNotification object:nil] deliverOnMainThread] subscribeNext:^(NSNotification *x) {
        
    }];
}



#pragma mark public
//=================================== 添加库 ===================================//
- (void)insertBundles:(NSArray<RNBridgeModel *> *)bundles {
    for (RNBridgeModel *bundle in bundles) {
        [self insertBundle:bundle];
    }
}

- (void)insertBundle:(RNBridgeModel *)bundle {
    dispatch_async(self.queue, ^{
        @synchronized (self) {
            // 已有库
            if ([self.models containsObject:bundle]) {
                RNBridgeModel *model = [self.models objectAtName:bundle.name];
                model.md5 = bundle.md5;
                model.path = bundle.path;
            }
            // 未有库
            else {
                [self.models addObject:bundle];
            }
        }
    });
}


//=================================== 安装库 ===================================//
- (void)installBundles:(NSArray<NSString *> *)names {
    for (NSString *name in names) {
        [self installBundle:name];
    }
}

- (void)installBundle:(NSString *)name {
    dispatch_async(self.queue, ^{
        [self.lock lock];
        RNBridgeModel *model = [self.models objectAtName:name];
        if (!model) {
            return;
        }
        dispatch_async(dispatch_get_main_queue(), ^{
            [model.vcs addObject:[[UIViewController getCurrentActivityViewController] uuid]];
            [model setNumber:model.number + 1];
            dispatch_async(self.queue, ^{
                [self startInstall];
            });
        });
    });
}


//=================================== 卸载库 ===================================//
- (void)uninstallBundles:(NSArray<NSString *> *)names {
    for (NSString *name in names) {
        [self uninstallBundle:name];
    }
}

- (void)uninstallBundle:(NSString *)name {
    dispatch_async(self.queue, ^{
        [self.lock lock];
        RNBridgeModel *model = [self.models objectAtName:name];
        if (!model) {
            return;
        }
        model.number -= 1;
        [self startUninstall];
    });
}


//=================================== 总流程 ===================================//
- (void)startInstall {
    // 还有没安装的库
    for (RNBridgeModel *model in self.models) {
        // 跳过common
        if ([model.name isEqualToString:@"common"]) {
            continue;
        }
        [self.modelLock lock];
        //  未加载 || 加载失败 || 已卸载
        BOOL con1 = model.loadComplete == false && model.number > 0;
        BOOL con2 = model.loadError == true && model.errorNumber < 2;
        BOOL con3 = model.uninstall == true;
        if (con1 || con2 || con3) {
            [self setModel:model];
            [self install];
        }
        else {
            [self.modelLock unlock];
            if ([self installComplete]) {
                [self.lock unlock];
                [self consoleLog];
            }
        }
    }
}

- (void)startUninstall {
    if (REACT_DEBUG) {
        [self.lock unlock];
        return;
    }
    
    for (RNBridgeModel *model in self.models) {
        [self.modelLock lock];
        if (model.number <= 0 && ![model.name isEqualToString:@"common"]) {
//            NSLog(@"====================================");
//            NSLog(@"================ 卸载完: %@", model.name);
//            NSLog(@"====================================");
            dispatch_sync(dispatch_get_main_queue(), ^{
                [model.view removeFromSuperview];
                [model setView:nil];
                [model.bridge invalidate];
                [model setBridge:nil];
                [model setLoadComplete:false];
                [model setLoadCommonBundle:false];
                [model setUninstall:true];
            });
        }
        [self.modelLock unlock];
    }
    [self consoleLog];
    [self.lock unlock];
}


//=================================== 具体流程 ===================================//
- (void)install {
    // Debug模式
    if (REACT_DEBUG) {
        [self installDebug];
        return;
    }
    
    RNBridgeModel *model = [self findBundle:self.model.loadCommonBundle == false ? @"common" : self.model.name];
    NSString *path = [self judgeMd5:model.md5];
    // 本地有文件
    if (path) {
        [self installLocal];
    }
    // 本地无文件,去下载
    else {
        [self installNetwork];
    }
}

- (void)installDebug {
    // 加载common
    if (self.model.loadCommonBundle == false) {
        NSURL *debugCommonUrl = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
        self.model.bridge = [[RCTBridge alloc] initWithBundleURL:debugCommonUrl moduleProvider:nil launchOptions:self.model.props];
    }
    // 直接返回
    else {
        [self.model setLoadComplete:true];
        [self.model install];
        [[NSNotificationCenter defaultCenter] postNotificationName:_NotificationBridgeLoadComplete object:self.model];
        [self.modelLock unlock];
    }
}

- (void)installLocal {
    RNBridgeModel *model = [self findBundle:self.model.loadCommonBundle == false ? @"common" : self.model.name];
    NSString *path = [self judgeMd5:model.md5];
    
    // 加载common
    if (self.model.loadCommonBundle == false) {
        dispatch_async(dispatch_get_main_queue(), ^{
            NSString *commonPath = [self judgeMd5:model.md5];
            NSURL *url = [NSURL fileURLWithPath:commonPath];
            if (!self.model.bridge) {
                self.model.bridge = [[RCTBridge alloc] initWithBundleURL:url moduleProvider:nil launchOptions:self.model.props];
            }
        });
    }
    // 加载business
    else {
        dispatch_async(dispatch_get_main_queue(), ^{
            NSError *error;
            NSData *data = [NSData dataWithContentsOfFile:path options:NSDataReadingMappedIfSafe error:&error];
            [self.model.bridge.batchedBridge executeSourceCode:data sync:false];
        });
    }
}

- (void)installNetwork {
    RNBridgeModel *model = [self findBundle:self.model.loadCommonBundle == false ? @"common" : self.model.name];
    @weakify(self)
    [self.download downloadBundle:model.path moduleName:model.name md5:model.md5 completeHandler:^(BOOL success, NSString *bundlePath) {
        @strongify(self)
        NSLog(@"下载完成");
        if (success) {
            // 加载common
            if (self.model.loadCommonBundle == false) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    NSString *commonPath = [self judgeMd5:model.md5];
                    NSURL *url = [NSURL fileURLWithPath:commonPath];
                    self.model.bridge = [[RCTBridge alloc] initWithBundleURL:url moduleProvider:nil launchOptions:self.model.props];
                });
            }
            // 加载business
            else {
                dispatch_async(dispatch_get_main_queue(), ^{
                    NSError *error;
                    NSString *bundleFilePath = [NSString stringWithFormat:@"%@/%@.bundle", bundlePath, self.model.name];
                    NSData *data = [NSData dataWithContentsOfFile:bundleFilePath options:NSDataReadingMappedIfSafe error:&error];
                    [self.model.bridge.batchedBridge executeSourceCode:data sync:false];
                });
            }
        }
        else {
            
        }
    }];
}



// 列表中查找库
- (RNBridgeModel *)findBundle:(NSString *)name {
    return [self.models objectAtName:name];
}

// 安装完成
- (BOOL)installComplete {
    BOOL installComplete = true;
    for (RNBridgeModel *model in self.models) {
        if (model.loadComplete == false && model.number > 0) {
            installComplete = false;
            return installComplete;
        }
    }
    return installComplete;
}

// 输出信息
- (void)consoleLog {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        // 设置输出信息
        NSMutableString *strm = [NSMutableString string];
        [strm appendString:@"\n"];
        [strm appendString:@"\n"];
        [strm appendString:@"-------------------------------------------------------------------------------\n"];
        [strm appendString:@"|  bundle      | number  |                                                    |\n"];
        [strm appendString:@"-------------------------------------------------------------------------------\n"];
        for (RNBridgeModel *model in self.models) {
            NSString *name = ({
                NSMutableString *names = [NSMutableString string];
                [names appendFormat:@"  %@", model.name];
                NSInteger count = 14-names.length;
                for (NSInteger i=0; i<count; i++) {
                    [names appendString:@" "];
                }
                names;
            });
            if ([model.name isEqualToString:@"common"]) {
                continue;
            }
            if (model.vcs.count == 0) {
                [strm appendFormat:@"|%@|   %2ld    |                                                    |\n", name, model.number];
            }
            else {
                NSMutableArray *array = [NSMutableArray arrayWithArray:[model.vcs allObjects]];
                for (NSInteger i=0; i<array.count; i++) {
                    NSString *vc = ({
                        NSMutableString *names = [NSMutableString string];
                        [names appendFormat:@"  %@", array[i]];
                        NSInteger count = 52-names.length;
                        for (NSInteger i=0; i<count; i++) {
                            [names appendString:@" "];
                        }
                        names;
                    });
                    if (i == 0) {
                        [strm appendFormat:@"|%@|   %2ld    |%@|\n", name, model.number, vc];
                    } else {
                        [strm appendFormat:@"|              |         |%@|\n", vc];
                    }
                }
            }
        }
        [strm appendString:@"-------------------------------------------------------------------------------\n"];
        [strm appendString:@"\n"];
        // 相同信息不再输出
        if ([self.log isEqualToString:strm]) {
            return;
        }
        [self setLog:strm];
        NSLog(@"%@", strm);
    });
}


#pragma mark private
// 获取库路径
- (NSString *)judgeMd5:(NSString *)md5 {
    NSString *bundleName = self.model.loadCommonBundle == true ? self.model.name : @"common";
    NSString *codePath = [[NSBundle mainBundle] pathForResource:bundleName ofType:@"bundle"];
    NSString *localPath = [RNBridgeUtil loadUnZipPath:bundleName];

    // 程序md5
    NSString *codeMd5 = [RNBridgeUtil loadMd5:codePath];
    // 本地md5
    NSString *localMd5 = [RNBridgeUtil loadMd5:localPath];

    if ([md5 isEqualToString:codeMd5]) {
        return codePath;
    }
    if ([md5 isEqualToString:localMd5]) {
        return localPath;
    }
    return nil;
}


#pragma mark getter
- (NSMutableArray<RNBridgeModel *> *)models {
    if (!_models) {
        _models = [NSMutableArray array];
    }
    return _models;
}

- (RNBridgeDownloadManager *)download {
    if (!_download) {
        _download = [[RNBridgeDownloadManager alloc] init];
    }
    return _download;
}

- (NSLock *)modelLock {
    if (!_modelLock) {
        _modelLock = [[NSLock alloc] init];
    }
    return _modelLock;
}

- (dispatch_queue_t)queue {
    if (!_queue) {
        _queue = dispatch_queue_create("queue", DISPATCH_QUEUE_SERIAL);
    }
    return _queue;
}


@end

