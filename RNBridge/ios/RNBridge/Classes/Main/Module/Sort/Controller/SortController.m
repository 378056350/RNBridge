//
//  SortController.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "SortController.h"

#pragma mark - 声明
@interface SortController ()

@end


#pragma mark - 实现
@implementation SortController


- (void)initUI {
    [super initUI];
    
    RNBridgeModel *model = [[RNBridgeStore sharedRNBridgeStore] findBundle:@"sort"];
    [model.view setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight - kTabbarHeight)];
    [self.view addSubview:model.view];
}

- (void)initEvent {
    [super initEvent];
    @weakify(self)
    [[[[[NSNotificationCenter defaultCenter] rac_addObserverForName:_NotificationBridgeLoadComplete object:nil] deliverOnMainThread] takeUntil:[self rac_willDeallocSignal]] subscribeNext:^(NSNotification *x) {
        @strongify(self)
        RNBridgeModel *model = x.object;
        if ([model.name isEqualToString:@"sort"]) {
            [model.view setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight - kTabbarHeight)];
            [self.view addSubview:model.view];
        }
    }];
}


@end

