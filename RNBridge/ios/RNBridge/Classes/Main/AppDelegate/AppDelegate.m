#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

// Flipper
static void InitializeFlipper(UIApplication *application) {
    FlipperClient *client = [FlipperClient sharedClient];
    SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
    [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
    [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
    [client addPlugin:[FlipperKitReactPlugin new]];
    [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
    [client start];
}
#endif


#pragma mark - 声明
@interface AppDelegate ()

@end


#pragma mark - 实现
@implementation AppDelegate

// 程序入口
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
#ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
#endif
    [RealmManager shareInstense];
    [self registeredRouter];
    [self registerController];
    return YES;
}

// 注册路由列表
- (void)registeredRouter {
    [[Routable sharedRouter] map:@"module" toController:[RNViewController class]];
    [[Routable sharedRouter] map:@"present" toController:[RNViewController class] withOptions:({
        UPRouterOptions *options = [[UPRouterOptions alloc] init];
        options.modal = true;
        options;
    })];
    [[Routable sharedRouter] setIgnoresExceptions:true];
}

// 根控制器
- (void)registerController {
    BasicTabBarController *vc = [[BasicTabBarController alloc] init];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    [self.window setBackgroundColor:kWhiteColor];
    [self.window setRootViewController:vc];
    [self.window makeKeyAndVisible];
}




@end





