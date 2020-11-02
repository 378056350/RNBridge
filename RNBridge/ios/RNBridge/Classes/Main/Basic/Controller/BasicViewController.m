//
//  BasicViewController.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#import "BasicViewController.h"

#pragma mark - 声明
@interface BasicViewController ()<UIGestureRecognizerDelegate>

@end


#pragma mark - 实现
@implementation BasicViewController


- (instancetype)init {
    if (self = [super init]) {
        // 返回按钮
        [self setIsShowLiftBack:true];
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view setBackgroundColor:kWhiteColor];
    [self registerNavigation];
    [self initUI];
    [self initEvent];
}

- (void)registerNavigation {
    // 导航栏全局设置
    [self.navigationController.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:kWhiteColor, NSFontAttributeName:kFontNormal(20)}];
    [self.navigationController.navigationBar setHidden:true];
    // 自定义导航栏
    [self.view addSubview:self.customNavBar];
    [self.customNavBar setBarBackgroundColor:kWhiteColor];
    [self.customNavBar wr_setBottomLineColor:kLineColor];
    [self.customNavBar setTitleLabelFont:kFontNormal(18)];
    [self.customNavBar setTitleLabelColor:kMainTextColor];
}

- (void)initUI {
    
}

- (void)initEvent {
    
}


#pragma mark - 跳转
- (void)pushPublishController {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Routable sharedRouter] open:@"publish" animated:true extraParams:({
            @{};
        })];
    });
}


#pragma mark setter
- (void)setIsShowLiftBack:(BOOL)isShowLiftBack {
    _isShowLiftBack = isShowLiftBack;
    if (isShowLiftBack) {
        UIImage *image = [UIImage imageNamed:@"navigBarHidden_back"];
        [self.customNavBar wr_setLeftButtonWithNormal:image highlighted:image];
    } else {
        [self.customNavBar wr_setLeftButtonWithNormal:[UIImage new] highlighted:[UIImage new]];
    }
}


#pragma mark getter
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:YES animated:YES];
    if ([self.navigationController respondsToSelector:@selector(interactivePopGestureRecognizer)]) {
        self.navigationController.interactivePopGestureRecognizer.delegate = self;
    }
}



@end

