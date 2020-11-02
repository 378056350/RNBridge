//
//  RNViewController.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "RNViewController.h"

#pragma mark - 声明
@interface RNViewController ()

@property (nonatomic, strong) NSString *name;

@end


#pragma mark - 实现
@implementation RNViewController


- (instancetype)initWithRouterParams:(NSDictionary *)params {
    if (self = [super init]) {
        RNBridgeStore *store = [RNBridgeStore sharedRNBridgeStore];
        if (params && [[params allKeys] containsObject:@"name"]) {
            RNBridgeModel *model = [store findBundle:params[@"name"]];
            self.name = params[@"name"];
            [self setBundles:@[model]];
            [store installBundle:self.name];
        }
        
        if (params && [[params allKeys] containsObject:@"props"]) {
            RNBridgeModel *model = [store findBundle:params[@"name"]];
            model.props = params[@"props"];
        } else {
            RNBridgeModel *model = [store findBundle:params[@"name"]];
            model.props = [NSMutableDictionary dictionaryWithObjectsAndKeys:model.uuid, @"uuid", nil];
        }
        
    }
    return self;
}

- (void)initUI {
    [super initUI];
    RNBridgeModel *model = [[RNBridgeStore sharedRNBridgeStore] findBundle:self.name];
    [model.view setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
    [self.view addSubview:model.view];
    if (model.loadComplete == true) {
        [model.vcs addObject:self.uuid];
        [[NSNotificationCenter defaultCenter] postNotificationName:@"rn_viewDidLoad" object:model.uuid];
    }
}

- (void)initEvent {
    [super initEvent];
    @weakify(self)
    [[[[[NSNotificationCenter defaultCenter] rac_addObserverForName:_NotificationBridgeLoadComplete object:nil] deliverOnMainThread] takeUntil:[self rac_willDeallocSignal]] subscribeNext:^(NSNotification *x) {
        @strongify(self)
        RNBridgeModel *model = x.object;
        if ([model.name isEqualToString:self.name]) {
            [model.view setFrame:CGRectMake(0, 0, kScreenWidth, kScreenHeight)];
            [self.view addSubview:model.view];
        }
    }];
}


@end


