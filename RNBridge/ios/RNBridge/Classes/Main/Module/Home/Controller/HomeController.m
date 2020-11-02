//
//  HomeController.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "HomeController.h"
#import "RNBridgeStore.h"
#import "NSArray+RNBridge.h"
#import <AFNetworking.h>

#pragma mark - 声明
@interface HomeController ()

@end


#pragma mark - 实现
@implementation HomeController


- (void)initUI {
    [super initUI];
    
    NSString *param = @"https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/param1.json";
    NSURL *url = [NSURL URLWithString:param];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDownloadTask *task = [session downloadTaskWithURL:url completionHandler:^(NSURL * _Nullable location, NSURLResponse *response, NSError *error) {
        NSMutableArray<RNBridgeModel *> *models = ({
            NSString *destPath = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject;
            NSString *fileName = [destPath stringByAppendingPathComponent:response.suggestedFilename];
            NSFileManager *fm = [NSFileManager defaultManager];
            [fm moveItemAtURL:location toURL:[NSURL fileURLWithPath:fileName] error:nil];
            NSString *string = [NSString stringWithContentsOfFile:fileName encoding:NSUTF8StringEncoding error:nil];
            NSArray *array = [string mj_JSONObject];
            NSMutableArray *models = [RNBridgeModel mj_objectArrayWithKeyValuesArray:array];
            models;
        });
        
        // 添加库
        [[RNBridgeStore sharedRNBridgeStore] insertBundles:models];
        
        RNBridgeModel *home = [models objectAtName:@"home"];
        RNBridgeModel *sort = [models objectAtName:@"sort"];
        RNBridgeModel *chat = [models objectAtName:@"chat"];
        RNBridgeModel *mine = [models objectAtName:@"mine"];
        
        
        [self setBundles:@[home, sort, chat, mine]];
        [[RNBridgeStore sharedRNBridgeStore] installBundles:@[@"home", @"sort", @"chat", @"mine"]];
        
    }];
    [task resume];
}

- (void)initEvent {
    [super initEvent];
    @weakify(self)
    [[[[[NSNotificationCenter defaultCenter] rac_addObserverForName:_NotificationBridgeLoadComplete object:nil] deliverOnMainThread] takeUntil:[self rac_willDeallocSignal]] subscribeNext:^(NSNotification *x) {
        @strongify(self)
        RNBridgeModel *model = x.object;
        if ([model.name isEqualToString:@"home"]) {
            [model.view setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight - kTabbarHeight)];
            [self.view addSubview:model.view];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [[NSNotificationCenter defaultCenter] postNotificationName:@"rn_viewDidLoad" object:model.uuid];
                
//                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//
//
//                    NSMutableArray *names = [NSMutableArray array];
//                    for (RNBridgeModel *model in self.prebundles) {
//                        [names addObject:model.name];
//                    }
//                    [[RNBridgeStore sharedRNBridgeStore] installBundles:names];
//                });
            });
        }
    }];
    
}



@end

