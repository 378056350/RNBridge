//
//  RNRootView.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "RNRootView.h"

#pragma mark - 声明
@interface RNRootView ()

@end


#pragma mark - 实现
@implementation RNRootView


- (void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    [self.rootView setFrame:self.bounds];
}

- (void)setRootView:(RCTRootView *)rootView {
    _rootView = rootView;
    [_rootView setFrame:self.bounds];
    [self addSubview:_rootView];
}

- (void)setProps:(NSDictionary *)props {
    _props = props;
    [self.rootView setAppProperties:props];
}

@end

