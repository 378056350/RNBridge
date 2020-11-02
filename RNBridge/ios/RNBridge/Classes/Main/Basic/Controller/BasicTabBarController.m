//
//  BasicTabBarController.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#import "BasicTabBarController.h"
#import "HomeController.h"
#import "BasicTabModel.h"


#pragma mark - 声明
@interface BasicTabBarController()<UITabBarControllerDelegate>

@end

#pragma mark - 实现
@implementation BasicTabBarController


+ (void)initialize {
    UITabBarItem *tabBarItem = [UITabBarItem appearance];
    
    NSMutableDictionary *dictNormal = [NSMutableDictionary dictionary];
    dictNormal[NSForegroundColorAttributeName] = kSecondaryTextColor;
    dictNormal[NSFontAttributeName] = kFontLight(10);
    
    NSMutableDictionary *dictSelected = [NSMutableDictionary dictionary];
    dictSelected[NSForegroundColorAttributeName] = kMainTextColor;
    dictSelected[NSFontAttributeName] = kFontLight(10);
    
    [tabBarItem setTitleTextAttributes:dictNormal forState:UIControlStateNormal];
    [tabBarItem setTitleTextAttributes:dictSelected forState:UIControlStateSelected];
    
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setDelegate:self];
    [self addChildViewControllers];
    
#pragma mark - 自定义Router
    BasicNavController *nav = self.viewControllers[0];
    [[Routable sharedRouter] setNavigationController:nav];
    
#pragma mark - 自定义tabbar
    [self.tabBar setBackgroundColor:kWhiteColor lineColor:kDefaultBackGroundColor height:countcoordinatesY(1)];
    [self.tabBar setTintColor:kMainTextColor];
}

- (void)addChildViewControllers {
    NSArray *names = @[@"首页", @"分类", @"聊天", @"我的"];
    NSArray *images = @[@"home",
                        @"sort",
                        @"chat",
                        @"mine"];
    NSArray *selectImages = @[@"home_select",
                              @"sort_select",
                              @"chat_select",
                              @"mine_select"];
    NSArray *vcs = @[@"HomeController",
                     @"SortController",
                     @"ChatController",
                     @"MineController"];
    
    NSMutableArray<BasicTabModel *> *models = [NSMutableArray array];
    for (int i=0; i<names.count; i++) {
        BasicTabModel *model = [[BasicTabModel alloc] init];
        [model setTitle:names[i]];
        [model setImage:images[i]];
        [model setSelectImage:selectImages[i]];
        [model setVc:vcs[i]];
        [models addObject:model];
        [self setChildController:model];
    }
    
}


#pragma mark - setter
- (void)setSelectedViewController:(__kindof UIViewController *)selectedViewController {
    [super setSelectedViewController:selectedViewController];
    // 设置路由，更改当前navController
    BasicNavController *nav = (BasicNavController *)selectedViewController;
    [[Routable sharedRouter] setNavigationController:nav];
}

- (void)setSelectedIndex:(NSUInteger)selectedIndex {
    [super setSelectedIndex:selectedIndex];
    [[Routable sharedRouter] setNavigationController:self.viewControllers[selectedIndex]];
}

- (void)setRedDotWithIndex:(NSInteger)index isShow:(BOOL)isShow {
    if (isShow) {
        [self.tabBar setBadgeStyle:kCustomBadgeStyleRedDot value:0 atIndex:index];
    } else {
        [self.tabBar setBadgeStyle:kCustomBadgeStyleNone value:0 atIndex:index];
    }
}


#pragma mark childControllers
/**
 *  @brief 设置vc
 *  @param model 数据
 */
- (void)setChildController:(BasicTabModel *)model {
    BasicViewController *vc = [NSClassFromString(model.vc) new];
    [vc setIsShowLiftBack:false];
    [vc.customNavBar setHidden:true];
    BasicNavController *nav = [[BasicNavController alloc] initWithRootViewController:vc];
    [vc.customNavBar setTitle:model.title];
    [vc setTitle:model.title];
//    [vc.tabBarItem setImage:kImageNamed(model.image)];
//    [vc.tabBarItem setSelectedImage:kImageNamed(model.selectImage)];
    [self addChildViewController:nav];
}


#pragma mark 动画
- (void)showLaunchImgAnimation {
    //    dispatch_async(dispatch_get_main_queue(), ^{
    //        LSAnimator *anim = [LSAnimator animatorWithView:self.launchImgView];
    //        anim.delay(0.5f).makeScale(1.5).makeOpacity(0).easeInOut.animateWithCompletion(0.5f, ^{
    //            [self.launchImgView setHidden:true];
    //        });
    //    });
}

- (void)dealloc {
    [kNotificationCenter removeObserver:self];
}


@end
