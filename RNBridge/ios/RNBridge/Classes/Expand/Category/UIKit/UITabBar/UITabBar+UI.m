//
//  UITabBar+Extension.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 Rainy. All rights reserved.
//

#import "UITabBar+UI.h"

@implementation UITabBar (UI)

/**
 * 设置tab上背景色和顶部线条色
 * @param bColor 背景色
 * @param lColor 线条色
 * @param height 线条高度
 */
- (void)setBackgroundColor:(UIColor *)bColor lineColor:(UIColor *)lColor height:(CGFloat)height {
    if (@available(iOS 13.0, *)) {
        CGRect rect = CGRectMake(0, 0, kScreenWidth, kScreenHeight);
        UIGraphicsBeginImageContext(rect.size);
        CGContextRef context = UIGraphicsGetCurrentContext();
        CGContextSetFillColorWithColor(context, bColor.CGColor);
        CGContextFillRect(context, rect);
        UIImage *img = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        
        UITabBarAppearance *tabBarAppearance = [self.standardAppearance copy];
        // 背景图片
        [tabBarAppearance setBackgroundImage:img];
        // 线条色
        [tabBarAppearance setShadowColor:lColor];
        [self setStandardAppearance:tabBarAppearance];
    }
    else {
        CGRect rect = CGRectMake(0, 0, kScreenWidth, height);
        UIGraphicsBeginImageContext(rect.size);
        CGContextRef context = UIGraphicsGetCurrentContext();
        CGContextSetFillColorWithColor(context, lColor.CGColor);
        CGContextFillRect(context, rect);
        UIImage *img = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        
        [self setShadowImage:img];
        [self setBackgroundImage:[[UIImage alloc] init]];
    }
}


/**
 * 设置tab字体/颜色
 * @param fColor 字体颜色
 * @param fName 字体大小
 * @param state 字体状态
 */
- (void)setFontColor:(UIColor *)fColor name:(UIFont *)fName state:(UIControlState)state {
    if (@available(iOS 13.0, *)) {
        UITabBarAppearance *appearance = self.standardAppearance;
        NSMutableParagraphStyle *par = [[NSMutableParagraphStyle alloc] init];
        par.alignment = NSTextAlignmentCenter;
        
        if (state == UIControlStateNormal) {
            UITabBarItemStateAppearance *normal = appearance.stackedLayoutAppearance.normal;
            if (normal) {
                normal.titleTextAttributes = @{
                    NSForegroundColorAttributeName: fColor,
                    NSParagraphStyleAttributeName : par,
                    NSFontAttributeName: fName
                };
            }
        }
        else if (state == UIControlStateSelected) {
            UITabBarItemStateAppearance *selected = appearance.stackedLayoutAppearance.selected;
            if (selected) {
                selected.titleTextAttributes = @{
                    NSForegroundColorAttributeName: fColor,
                    NSParagraphStyleAttributeName : par,
                    NSFontAttributeName: fName
                };
            }
        }
        self.standardAppearance = appearance;
        
        
        
        
        
    } else {
        UITabBarItem *tabBarItem = [UITabBarItem appearance];
        
        NSMutableDictionary *dictNormal = [NSMutableDictionary dictionary];
        dictNormal[NSForegroundColorAttributeName] = fColor;
        dictNormal[NSFontAttributeName] = fName;
        
        [tabBarItem setTitleTextAttributes:dictNormal forState:state];
    }
}


@end
