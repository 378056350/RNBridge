//
//  UITabBar+Extension.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 Rainy. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UITabBar (UI)

/**
 * 设置tab背景色、顶部线条色
 * @param bColor 背景色
 * @param lColor 线条色
 * @param height 线条高度
 */
- (void)setBackgroundColor:(UIColor *)bColor lineColor:(UIColor *)lColor height:(CGFloat)height;

/**
 * 设置tab字体、颜色
 * @param fColor 字体颜色
 * @param fName 字体大小
 * @param state 字体状态
 */
- (void)setFontColor:(UIColor *)fColor name:(UIFont *)fName state:(UIControlState)state;

@end

NS_ASSUME_NONNULL_END
