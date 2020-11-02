//
//  UIView+Extension.m
//  BasicFramework
//
//  Created by 郑业强 on 2020/3/26.
//  Copyright © 2020 nko. All rights reserved.
//

#import "UIView+Extension.h"

@implementation UIView (Extension)

- (CGRect)convertRectWithWindow {
    UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
    CGRect rect = [self convertRect:self.bounds toView:window];
    return rect;
}

- (UIImage *)imageFromView {
    CGSize size = self.size;
    UIGraphicsBeginImageContextWithOptions(size, NO, [UIScreen mainScreen].scale);
    [self.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    image = [UIImage imageWithCGImage:image.CGImage scale:[UIScreen mainScreen].scale orientation:UIImageOrientationUp];
    UIGraphicsEndImageContext();
    return image;
}

@end
