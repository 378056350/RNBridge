//
//  BasicWebController.h
//  CashBack
//
//  Created by Rainy on 2017/4/11.
//  Copyright © 2017年 Rainy. All rights reserved.
//

#import "BasicViewController.h"
#import "BasicWebView.h"

@interface BasicWebController : BasicViewController

@property (nonatomic, strong) BasicWebView *web;
@property (nonatomic, copy  ) NSString *urlString;

@end
