//
//  UITabBar+CustomBadge.m
//  gamecenter
//
//  Created by ZhuGuangwen on 15/9/21.
//  Copyright © 2015年 wepie. All rights reserved.
//

#import "UITabBar+CustomBadge.h"
#import <objc/runtime.h>

static NSString * const kBadgeViewInitedKey = @"kBadgeViewInited";
static NSString * const kBadgeDotViewsKey = @"kBadgeDotViewsKey";
static NSString * const kBadgeNumberViewsKey = @"kBadgeNumberViewsKey";
static NSString * const kTabIconWidth = @"kTabIconWidth";
static NSString * const kBadgeTop = @"kBadgeTop";

@implementation UITabBar (CustomBadge)

-(void)setTabIconWidth:(CGFloat)width{
    [self setValue:@(width) forUndefinedKey:kTabIconWidth];
}

-(void)setBadgeTop:(CGFloat)top{
    [self setValue:@(top) forUndefinedKey:kBadgeTop];
}

-(void)setBadgeStyle:(CustomBadgeType)type value:(NSInteger)badgeValue atIndex:(NSInteger)index{
    if( ![[self valueForKey:kBadgeViewInitedKey] boolValue] ){
        [self setValue:@(YES) forKey:kBadgeViewInitedKey];
        [self addBadgeViews];
    }
    NSMutableArray *badgeDotViews = [self valueForKey:kBadgeDotViewsKey];
    NSMutableArray *badgeNumberViews = [self valueForKey:kBadgeNumberViewsKey];
    
    [badgeDotViews[index] setHidden:YES];
    [badgeNumberViews[index] setHidden:YES];
    
    if(type == kCustomBadgeStyleRedDot){
        [badgeDotViews[index] setHidden:NO];
        
    }else if(type == kCustomBadgeStyleNumber){
        [badgeNumberViews[index] setHidden:NO];
        UILabel *label = badgeNumberViews[index];
        [self adjustBadgeNumberViewWithLabel:label number:badgeValue];
        
    }else if(type == kCustomBadgeStyleNone){
    }
}

-(void)addBadgeViews{
    id idIconWith = [self valueForKey:kTabIconWidth];
    CGFloat tabIconWidth = idIconWith ? [idIconWith floatValue] : 32;
    id idBadgeTop = [self valueForKey:kBadgeTop];
    CGFloat badgeTop = idBadgeTop ? [idBadgeTop floatValue] : 11;
    
    NSInteger itemsCount = self.items.count;
    CGFloat itemWidth = self.bounds.size.width / itemsCount;
    
//    // dot views
//    NSMutableArray *badgeDotViews = [NSMutableArray new];
//    for(int i = 0;i < itemsCount;i ++){
//        UIView *redDot = [UIView new];
//        redDot.bounds = CGRectMake(0, 0, 10, 10);
//        redDot.center = CGPointMake(itemWidth*(i+0.5)+tabIconWidth/2, badgeTop);
//        redDot.layer.cornerRadius = redDot.bounds.size.width/2;
//        redDot.clipsToBounds = YES;
//        redDot.backgroundColor = [UIColor redColor];
//        redDot.hidden = YES;
//        [self addSubview:redDot];
//        [badgeDotViews addObject:redDot];
//    }
//    [self setValue:badgeDotViews forKey:kBadgeDotViewsKey];
    
    
    Class class = NSClassFromString(@"UITabBarButton");
    int btnIndex = 0;
    NSMutableArray *badgeDotViews = [NSMutableArray new];
    for (int i=0; i<self.subviews.count; i++) {
        UIView *btn = self.subviews[i];
        if ([btn isKindOfClass:class]) {
            Class imgClass = NSClassFromString(@"UITabBarSwappableImageView");
            for (UIView *img in btn.subviews) {
                if ([img isKindOfClass:imgClass]) {
                    UIView *redDot = [UIView new];
                    redDot.bounds = CGRectMake(0, 0, 10, 10);
                    redDot.center = CGPointMake(img.right + btn.left, badgeTop);
                    redDot.layer.cornerRadius = redDot.bounds.size.width/2;
                    redDot.clipsToBounds = YES;
                    redDot.backgroundColor = [UIColor redColor];
                    redDot.hidden = YES;
                    [self addSubview:redDot];
                    [badgeDotViews addObject:redDot];
                }
            }
            btnIndex ++;
        }
    }
    [self setValue:badgeDotViews forKey:kBadgeDotViewsKey];
    
    
    btnIndex = 0;
    NSMutableArray *badgeNumberViews = [NSMutableArray new];
    for (int i=0; i<self.subviews.count; i++) {
        UIView *btn = self.subviews[i];
        if ([btn isKindOfClass:class]) {
            Class imgClass = NSClassFromString(@"UITabBarSwappableImageView");
            for (UIView *img in btn.subviews) {
                if ([img isKindOfClass:imgClass]) {
                    UILabel *redNum = [UILabel new];
                    redNum.layer.anchorPoint = CGPointMake(0, 0.5);
                    redNum.bounds = CGRectMake(0, 0, 20, 14);
                    redNum.center = CGPointMake(img.right + btn.left, badgeTop);
                    redNum.layer.cornerRadius = redNum.bounds.size.height/2;
                    redNum.clipsToBounds = YES;
                    redNum.backgroundColor = [UIColor redColor];
                    redNum.hidden = YES;
                    
                    redNum.textAlignment = NSTextAlignmentCenter;
                    redNum.font = [UIFont systemFontOfSize:12];
                    redNum.textColor = [UIColor whiteColor];
                    
                    [self addSubview:redNum];
                    [badgeNumberViews addObject:redNum];
                }
            }
            btnIndex ++;
        }
    }
    [self setValue:badgeNumberViews forKey:kBadgeNumberViewsKey];
    
//    //number views
//    NSMutableArray *badgeNumberViews = [NSMutableArray new];
//    for(int i = 0;i < itemsCount;i ++){
//        UILabel *redNum = [UILabel new];
//        redNum.layer.anchorPoint = CGPointMake(0, 0.5);
//        redNum.bounds = CGRectMake(0, 0, 20, 14);
//        redNum.center = CGPointMake(itemWidth*(i+0.5)+tabIconWidth/2-10, badgeTop);
//        redNum.layer.cornerRadius = redNum.bounds.size.height/2;
//        redNum.clipsToBounds = YES;
//        redNum.backgroundColor = [UIColor redColor];
//        redNum.hidden = YES;
//
//        redNum.textAlignment = NSTextAlignmentCenter;
//        redNum.font = [UIFont systemFontOfSize:12];
//        redNum.textColor = [UIColor whiteColor];
//
//        [self addSubview:redNum];
//        [badgeNumberViews addObject:redNum];
//    }
//    [self setValue:badgeNumberViews forKey:kBadgeNumberViewsKey];
}

-(void)adjustBadgeNumberViewWithLabel:(UILabel *)label number:(NSInteger)number{
    [label setText:(number > 99 ? @"..." : @(number).stringValue)];
    if(number < 10){
        label.bounds = CGRectMake(0, 0, 14, 14);
    }else if(number < 99){
        label.bounds = CGRectMake(0, 0, 20, 14);
    }else{
        label.bounds = CGRectMake(0, 0, 20, 14);
    }
}

-(id)valueForUndefinedKey:(NSString *)key{
    return objc_getAssociatedObject(self, (__bridge const void *)(key));
}

-(void)setValue:(id)value forUndefinedKey:(NSString *)key{
    objc_setAssociatedObject(self, (__bridge const void *)(key), value, OBJC_ASSOCIATION_COPY);
}

@end
