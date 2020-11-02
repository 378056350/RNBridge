//
//  MineController.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "MineController.h"

#pragma mark - 声明
@interface MineController ()

@end


#pragma mark - 实现
@implementation MineController


- (void)initUI {
    [super initUI];
    
    RNBridgeModel *model = [[RNBridgeStore sharedRNBridgeStore] findBundle:@"mine"];
    [model.view setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight - kTabbarHeight)];
    [self.view addSubview:model.view];
    [self setBundles:@[model]];
    if (model.loadComplete == true) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"rn_viewDidLoad" object:model.uuid];
        
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            NSMutableArray *names = [NSMutableArray array];
//            for (RNBridgeModel *model in self.prebundles) {
//                [names addObject:model.name];
//            }
//            [[RNBridgeStore sharedRNBridgeStore] installBundles:names];
//        });
    }
}

- (void)initEvent {
    [super initEvent];
}


@end

