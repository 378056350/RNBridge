//
//  UIFont+Extension.m
//  KKPhoto
//
//  Created by 郑业强 on 2017/7/30.
//  Copyright © 2017年 郑业强. All rights reserved.
//

#import "UIFont+Adjust.h"

#define IS_IPHONE_5 ([[UIScreen mainScreen] bounds].size.height == 568.0f)
#define IS_IPHONE_6 ([[UIScreen mainScreen] bounds].size.height == 667.0f)
#define IS_IPHONE_6_PLUS ([[UIScreen mainScreen] bounds].size.height == 736.0f)
#define IS_IPHONE_6_PLUS_UP ([[UIScreen mainScreen] bounds].size.height > 736.0f)

// iphone5
#define IPHONE5_INCREMENT -1
// iphone6
#define IPHONE6_INCREMENT 0
// iphone6p
#define IPHONE6PLUS_INCREMENT 2
// iphone6p_up
#define IPHONE6PLUS_UP_INCREMENT 2

@implementation UIFont (Adjust)

+ (CGFloat)adjustFontSize:(CGFloat)fontsize {
    CGFloat newFont;
    if (IS_IPHONE_5) {
        newFont = fontsize + IPHONE5_INCREMENT;
    } else if (IS_IPHONE_6) {
        newFont = fontsize + IPHONE6_INCREMENT;
    } else if (IS_IPHONE_6_PLUS) {
        newFont = fontsize + IPHONE6PLUS_INCREMENT;
    } else if (IS_IPHONE_6_PLUS_UP) {
        newFont = fontsize + IPHONE6PLUS_UP_INCREMENT;
    } else {
        newFont = fontsize;
    }
    return newFont;
}




@end

