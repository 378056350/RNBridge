//
//  UIViewController+Basic.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/11/20.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WRCustomNavigationBar.h"

NS_ASSUME_NONNULL_BEGIN

@interface UIViewController (Basic)

/// 导航栏
@property (nonatomic, strong) WRCustomNavigationBar *customNavBar;

@end

NS_ASSUME_NONNULL_END
