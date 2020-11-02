//
//  RNBridgeNativeEmiter.m
//  HealthWatch
//
//  Created by 郑业强 on 2020/10/16.
//

#import "RNBridgeNativeEmiter.h"

#pragma mark - 声明
@interface RNBridgeNativeEmiter ()

@end


#pragma mark - 实现
@implementation RNBridgeNativeEmiter

RCT_EXPORT_MODULE();

- (instancetype)init {
    if (self = [super init]) {
        @weakify(self)
        [[[NSNotificationCenter defaultCenter] rac_addObserverForName:@"rn_viewDidLoad" object:nil] subscribeNext:^(NSNotification *x) {
            @strongify(self)
            [self sendEventWithName:@"rn_viewDidLoad" body:x.object];
        }];
        [[[NSNotificationCenter defaultCenter] rac_addObserverForName:@"rn_viewWillAppear" object:nil] subscribeNext:^(NSNotification *x) {
            @strongify(self)
            [self sendEventWithName:@"rn_viewWillAppear" body:x.object];
        }];
        [[[NSNotificationCenter defaultCenter] rac_addObserverForName:@"rn_viewDidAppear" object:nil] subscribeNext:^(NSNotification *x) {
            @strongify(self)
            [self sendEventWithName:@"rn_viewDidAppear" body:x.object];
        }];
        [[[NSNotificationCenter defaultCenter] rac_addObserverForName:@"rn_viewDidDisappear" object:nil] subscribeNext:^(NSNotification *x) {
            @strongify(self)
            [self sendEventWithName:@"rn_viewDidDisappear" body:x.object];
        }];
    }
    return self;
}

// 跳转控制器
RCT_EXPORT_METHOD(push:(NSString *)name props:(NSDictionary *)props) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Routable sharedRouter] open:@"module" animated:true extraParams:({
            [NSDictionary dictionaryWithObjectsAndKeys:
             name, @"name",
             props, @"props",
             nil];
        })];
    });
}

// 返回
RCT_EXPORT_METHOD(pop) {
    dispatch_async(dispatch_get_main_queue(), ^{
       [[Routable sharedRouter] pop:true];
    });
}

// 切换控制器
RCT_EXPORT_METHOD(setSelectedIndex:(NSInteger)index) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UITabBarController *tab = (UITabBarController *)kWindow.rootViewController;
        [tab setSelectedIndex:index];
    });
}

// 添加预加载库
RCT_EXPORT_METHOD(addPrebundles:(NSArray *)prebundles) {
    dispatch_async(dispatch_get_main_queue(), ^{
        // 找到库
        NSMutableArray<RNBridgeModel *> *models = [NSMutableArray array];
        NSMutableArray<NSString *> *names = [NSMutableArray array];
        for (NSString *bundle in prebundles) {
            RNBridgeModel *model = [[RNBridgeStore sharedRNBridgeStore] findBundle:bundle];
            [models addObject:model];
            [names addObject:model.name];
        }
        // 添加库
        UIViewController *vc = [UIViewController getCurrentActivityViewController];
        [vc setPrebundles:models];
        // 安装库
        for (RNBridgeModel *model in models) {
            if (![model.vcs containsObject:vc.uuid]) {
                [model.vcs addObject:vc.uuid];
                [[RNBridgeStore sharedRNBridgeStore] installBundle:model.name];
            }
        }
    });
}

// 隐藏键盘
RCT_EXPORT_METHOD(hideKeyboard) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [kWindow endEditing:true];
    });
}

// 读取plist文件
RCT_EXPORT_METHOD(loadPlist:(NSString *)pathName
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString *path = [[NSBundle mainBundle] pathForResource:pathName ofType:@"plist"];
        NSArray *array = [NSArray arrayWithContentsOfFile:path];
        resolve(array);
    });
}



///==================================== 存储数据 ====================================///
/**
 *  存储地址
 */
RCT_EXPORT_METHOD(insertAddress:(NSDictionary *)param
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [[RealmManager shareInstense].realm transactionWithBlock:^{
            RLMAddress *model = [[RLMAddress alloc] init];
            [model setId:param[@"Id"]];
            [model setUser:param[@"user"]];
            [model setPhone:param[@"phone"]];
            [model setProvince:param[@"province"]];
            [model setCity:param[@"city"]];
            [model setArea:param[@"area"]];
            [model setDetail:param[@"detail"]];
            [model setIsDefault:[param[@"isDefault"] boolValue]];
            [[RealmManager shareInstense].realm addObject:model];
            resolve(nil);
        }];
    });
}

/**
 *  修改地址
 */
RCT_EXPORT_METHOD(updateAddress:(NSDictionary *)param
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [[RealmManager shareInstense].realm transactionWithBlock:^{
            RLMResults *result = [RLMAddress allObjects];
            for (NSInteger i=0; i<result.count; i++) {
                RLMAddress *model = [result objectAtIndex:i];
                if ([model.Id isEqualToString:param[@"Id"]]) {
                    model.user = param[@"user"];
                    model.phone = param[@"phone"];
                    model.province = param[@"province"];
                    model.city = param[@"city"];
                    model.area = param[@"area"];
                    model.detail = param[@"detail"];
                    model.isDefault = [param[@"isDefault"] boolValue];
                    break;
                }
            }
            resolve(nil);
        }];
    });
}

/**
 *  删除地址
 */
RCT_EXPORT_METHOD(deleteAddress:(NSDictionary *)param
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [[RealmManager shareInstense].realm transactionWithBlock:^{
            RLMResults *result = [RLMAddress allObjects];
            for (NSInteger i=0; i<result.count; i++) {
                RLMAddress *model = [result objectAtIndex:i];
                if ([model.Id isEqualToString:param[@"Id"]]) {
                    [[RealmManager shareInstense].realm deleteObject:model];
                    break;
                }
            }
            resolve(nil);
        }];
    });
}

/**
 *  获取地址
 */
RCT_REMAP_METHOD(selectAddress,
                 resolve:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    NSTimeInterval time = random() % 10 / 10 + 0.5;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(time * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        NSMutableArray *array = [NSMutableArray array];
        RLMResults *result = [RLMAddress allObjects];
        for (NSInteger i=0; i<result.count; i++) {
            RLMAddress *address = [result objectAtIndex:i];
            [array addObject:[address hd_keyValues]];
        }
        resolve(array);
    });
}






// 方法名
- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"rn_viewDidLoad",
        @"rn_viewWillAppear",
        @"rn_viewDidAppear",
        @"rn_viewDidDisappear"
    ];
}

+ (BOOL)requiresMainQueueSetup {
    return true;
}


@end

