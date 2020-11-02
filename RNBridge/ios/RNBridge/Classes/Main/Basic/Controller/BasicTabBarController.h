//
//  BasicTabBarController.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BasicTabBarController : UITabBarController

/// 设置小红点
- (void)setRedDotWithIndex:(NSInteger)index isShow:(BOOL)isShow;

@end

NS_ASSUME_NONNULL_END
