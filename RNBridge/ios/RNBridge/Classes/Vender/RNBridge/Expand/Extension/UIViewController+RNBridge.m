//
//  UIViewController+RNBridge.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "UIViewController+RNBridge.h"
#import "NSObject+Swizzling.h"


#pragma mark key
static char* UIViewControllerBundleKey = "UIViewControllerBundleKey";
static char* UIViewControllerPreBundleKey = "UIViewControllerPreBundleKey";
static char* UIViewControllerUuidKey = "UIViewControllerUuidKey";


#pragma mark 实现
@implementation UIViewController (RNBridge)


#pragma mark 分类
- (void)setBundles:(NSArray<NSString *> *)bundles {
    objc_setAssociatedObject(self, UIViewControllerBundleKey, bundles, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSArray<NSString *> *)bundles {
    return objc_getAssociatedObject(self, UIViewControllerBundleKey);
}

- (void)setPrebundles:(NSArray<NSString *> *)prebundles {
    objc_setAssociatedObject(self, UIViewControllerPreBundleKey, prebundles, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSArray<NSString *> *)prebundles {
    return objc_getAssociatedObject(self, UIViewControllerPreBundleKey);
}

- (void)setUuid:(NSString *)uuid {
    objc_setAssociatedObject(self, UIViewControllerUuidKey, uuid, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSString *)uuid {
    NSString *uuid = objc_getAssociatedObject(self, UIViewControllerUuidKey);
    if (!uuid) {
        NSString *name = NSStringFromClass([self class]);
        NSString *Id = [[NSString uuidString] stringByReplacingOccurrencesOfString:@"-" withString:@""];
        uuid = [NSString stringWithFormat:@"%@-%@", name, Id];
        self.uuid = uuid;
    }
    return uuid;
}


#pragma mark util
+ (UIViewController *)getCurrentActivityViewController {
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    if (window.windowLevel != UIWindowLevelNormal) {
        NSArray *windows = [[UIApplication sharedApplication] windows];
        for (UIWindow * tmpWin in windows) {
            if (tmpWin.windowLevel == UIWindowLevelNormal) {
                window = tmpWin;
                break;
            }
        }
    }
    
    // 从根控制器开始查找
    UIViewController *rootVC = window.rootViewController;
    UIViewController *activityVC = nil;
    
    while (true) {
        if ([rootVC isKindOfClass:[UINavigationController class]]) {
            activityVC = [(UINavigationController *)rootVC visibleViewController];
        } else if ([rootVC isKindOfClass:[UITabBarController class]]) {
            activityVC = [(UITabBarController *)rootVC selectedViewController];
        } else if (rootVC.presentedViewController) {
            activityVC = rootVC.presentedViewController;
        }else {
            break;
        }
        
        rootVC = activityVC;
    }
    
    return activityVC;
}


#pragma mark method swizzling
+ (void)load {
    [NSObject swizzlingInClass:[UIViewController class] originalSelector:@selector(viewWillAppear:) swizzledSelector:@selector(rn_viewWillAppear:)];
    [NSObject swizzlingInClass:[UIViewController class] originalSelector:@selector(viewDidAppear:) swizzledSelector:@selector(rn_viewDidAppear:)];
    [NSObject swizzlingInClass:[UIViewController class] originalSelector:@selector(viewDidDisappear:) swizzledSelector:@selector(rn_viewDidDisappear:)];
    [NSObject swizzlingInClass:[UIViewController class] originalSelector:@selector(didMoveToParentViewController:) swizzledSelector:@selector(rn_didMoveToParentViewController:)];
    [NSObject swizzlingInClass:[UIViewController class] originalSelector:@selector(dismissViewControllerAnimated:completion:) swizzledSelector:@selector(rn_dismissViewControllerAnimated:completion:)];
}

- (void)rn_viewWillAppear:(BOOL)animated {
    [self rn_viewWillAppear:animated];
    
    RNBridgeModel *model = [self.bundles firstObject];
    if (model.loadComplete == true) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"rn_viewWillAppear" object:model.uuid];
    }
    
}

- (void)rn_viewDidAppear:(BOOL)animated {
    [self rn_viewDidAppear:animated];
    
    // 通知
    RNBridgeModel *model = [self.bundles firstObject];
    if (model.loadComplete == true) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"rn_viewDidAppear" object:model.uuid];
    }
    // 安装库
    BOOL con1 = ![self isKindOfClass:[UITabBarController class]];
    BOOL con2 = ![self isKindOfClass:[UINavigationController class]];
    if (con1 && con2) {
        // 安装库
        for (RNBridgeModel *model in self.prebundles) {
            if (![model.vcs containsObject:self.uuid]) {
                [model.vcs addObject:self.uuid];
                [[RNBridgeStore sharedRNBridgeStore] installBundle:model.name];
            }
        }
        // 输出信息
        if (self.prebundles.count == 0) {
            [[RNBridgeStore sharedRNBridgeStore] consoleLog];
        }
    }
    
}

- (void)rn_viewDidDisappear:(BOOL)animated {
    [self rn_viewDidDisappear:animated];
    
    // 通知
    RNBridgeModel *model = [self.bundles firstObject];
    if (model.loadComplete == true) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"rn_viewDidDisappear" object:model.uuid];
    }
    // 卸载库
    BOOL con1 = ![self isKindOfClass:[UITabBarController class]];
    BOOL con2 = ![self isKindOfClass:[UINavigationController class]];
    if (con1 && con2) {
        for (RNBridgeModel *model in self.prebundles) {
            [model.vcs removeObject:self.uuid];
            [[RNBridgeStore sharedRNBridgeStore] uninstallBundle:model.name];
        }
    }
    
}

- (void)rn_didMoveToParentViewController:(UIViewController *)parent {
    [self rn_didMoveToParentViewController:parent];
    // POP 操作
    if (!parent && self.bundles.count != 0) {
        // 卸载库
        NSMutableArray *names = [NSMutableArray array];
        for (RNBridgeModel *bundle in self.bundles) {
            [names addObject:bundle.name];
        }
        [[RNBridgeStore sharedRNBridgeStore] uninstallBundles:names];
        // 移除标识
        RNBridgeModel *model = [self.bundles firstObject];
        [model.vcs removeObject:self.uuid];
    }
}

- (void)rn_dismissViewControllerAnimated:(BOOL)flag completion:(void (^)(void))completion {
    [self rn_dismissViewControllerAnimated:flag completion:completion];
    
    if (self.bundles.count != 0) {
        // 卸载库
        NSMutableArray *names = [NSMutableArray array];
        for (RNBridgeModel *bundle in self.bundles) {
            [names addObject:bundle.name];
        }
        [[RNBridgeStore sharedRNBridgeStore] uninstallBundles:names];
        // 移除标识
        RNBridgeModel *model = [self.bundles firstObject];
        [model.vcs removeObject:model.uuid];
    }
    
    
    
}


@end
