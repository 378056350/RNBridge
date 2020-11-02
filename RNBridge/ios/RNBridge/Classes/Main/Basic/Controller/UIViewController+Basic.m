//
//  UIViewController+Basic.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/11/20.
//  Copyright © 2019 nko. All rights reserved.
//

#import "UIViewController+Basic.h"
#import <objc/runtime.h>


#pragma mark key
static char* UIViewControllerNavKey = "popUpPositionKey";


#pragma mark 实现
@implementation UIViewController (Basic)

- (void)setCustomNavBar:(WRCustomNavigationBar *)customNavBar {
    objc_setAssociatedObject(self, UIViewControllerNavKey, customNavBar, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (WRCustomNavigationBar *)customNavBar {
    WRCustomNavigationBar *customNavBar = objc_getAssociatedObject(self, UIViewControllerNavKey);
    if (!customNavBar) {
        customNavBar = [WRCustomNavigationBar CustomNavigationBar];
        [self setCustomNavBar:customNavBar];
    }
    return customNavBar;
}


@end
