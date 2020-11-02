//
//  RNBridgeEmiter.m
//  AwesomeProject
//
//  Created by 郑业强 on 2020/10/6.
//

#import "RNBridgeEmiter.h"

#pragma mark - 声明
@interface RNBridgeEmiter ()

@end


#pragma mark - 实现
@implementation RNBridgeEmiter

RCT_EXPORT_MODULE();


#pragma mark - 单例
/// 单例
+ (instancetype)sharedSingleton {
    static dispatch_once_t onceToken;
    static RNBridgeEmiter *singleton = nil;
    dispatch_once(&onceToken, ^{
        singleton = [[super allocWithZone:NULL] init];
    });
    return singleton;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    return [RNBridgeEmiter sharedSingleton];
}

- (instancetype)copyWithZone:(nullable NSZone *)zone {
    return [RNBridgeEmiter sharedSingleton];
}

- (instancetype)init {
    if (self = [super init]) {
        // 加载图片资源
        [[[NSNotificationCenter defaultCenter] rac_addObserverForName:@"BundleLoad" object:nil] subscribeNext:^(NSNotification *notification) {
            NSString *bundlePath = notification.userInfo[@"path"];
            [self sendEventWithName:@"BundleLoad" body:@{@"path": bundlePath}];
        }];
    }
    return self;
}


#pragma mark - RCTEventEmitter
- (NSArray<NSString *> *)supportedEvents {
    return @[@"BundleLoad"];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}


@end
