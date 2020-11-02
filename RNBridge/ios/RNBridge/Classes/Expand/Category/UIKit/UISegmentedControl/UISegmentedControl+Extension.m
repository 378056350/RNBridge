//
//  UISegmentedControl+Extension.m
//  Bookkeeping
//
//  Created by 郑业强 on 2020/4/23.
//  Copyright © 2020 kk. All rights reserved.
//

#import "UISegmentedControl+Extension.h"

@implementation UISegmentedControl (Extension)

- (void)ensureiOS12Style {
    if (@available(iOS 13.0, *)) {
        [self setTitleTextAttributes:@{NSForegroundColorAttributeName: [UIColor whiteColor], NSFontAttributeName: [UIFont boldSystemFontOfSize:14.0f]} forState:UIControlStateSelected];
        UIColor*tintColor=[self tintColor];UIImage*tintColorImage=[self imageWithColor:tintColor];
        
        // Must set the background image for normal to something (even clear) else the rest won't work
        
        [self setBackgroundImage:[self imageWithColor:self.backgroundColor?self.backgroundColor:[UIColor clearColor]]forState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
        
        [self setBackgroundImage:tintColorImage forState:UIControlStateSelected barMetrics:UIBarMetricsDefault];
        
        [self setBackgroundImage:[self imageWithColor:[tintColor colorWithAlphaComponent:0.2]]forState:UIControlStateHighlighted barMetrics:UIBarMetricsDefault];
        
        [self setBackgroundImage:tintColorImage forState:UIControlStateSelected|UIControlStateSelected barMetrics:UIBarMetricsDefault];
        
        [self setTitleTextAttributes:@{NSForegroundColorAttributeName:tintColor,NSFontAttributeName:[UIFont systemFontOfSize:13]}forState:UIControlStateNormal];
        
        [self setDividerImage:tintColorImage forLeftSegmentState:UIControlStateNormal rightSegmentState:UIControlStateNormal barMetrics:UIBarMetricsDefault];
        
        self.layer.borderWidth=1;self.layer.borderColor=[tintColor CGColor];}}

- (UIImage*)imageWithColor:(UIColor*)color {CGRect rect=CGRectMake(0.0f,0.0f,1.0f,1.0f);
    
    UIGraphicsBeginImageContext(rect.size);
    
    CGContextRef context=UIGraphicsGetCurrentContext();
    
    CGContextSetFillColorWithColor(context,[color CGColor]);
    
    CGContextFillRect(context,rect);
    
    UIImage*theImage=UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
    
    return theImage;
    
}

@end
