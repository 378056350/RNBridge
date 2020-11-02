//
//  BasicView.m
//  Bookkeeping
//
//  Created by 郑业强 on 2020/4/12.
//  Copyright © 2020 kk. All rights reserved.
//

#import "BasicView.h"


#pragma mark - 声明
@interface BasicView ()

@end


#pragma mark - 实现
@implementation BasicView

+ (instancetype)loadFirstNib:(CGRect)frame {
    BasicView *view = [self loadNib:0 frame:frame];
    return view;
}

+ (instancetype)loadLastNib:(CGRect)frame {
    NSInteger index = [self getViews].count - 1;
    BasicView *view = [self loadNib:index frame:frame];
    return view;
}

+ (instancetype)loadCode:(CGRect)frame {
    BasicView *view = [[[self class] alloc] initWithFrame:frame];
    [view initUI];
    [view initEvent];
    return view;
}

+ (instancetype)loadNib:(NSInteger)index frame:(CGRect)frame {
    NSString *name = NSStringFromClass(self);
    BasicView *view = [[NSBundle mainBundle] loadNibNamed:name owner:nil options:nil][index];
    [view setFrame:frame];
    [view initUI];
    [view initEvent];
    return view;
}

+ (NSArray *)getViews {
    NSString *name = NSStringFromClass(self);
    return [[NSBundle mainBundle] loadNibNamed:name owner:nil options:nil];
}

- (void)initUI {
    
}

- (void)initEvent {
    
}


@end
