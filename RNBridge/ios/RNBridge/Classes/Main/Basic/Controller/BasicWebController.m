//
//  BasicWebController.m
//  CashBack
//
//  Created by Rainy on 2017/4/11.
//  Copyright © 2017年 Rainy. All rights reserved.
//

#import "BasicWebController.h"


#pragma mark - 声明
@interface BasicWebController ()

@end


#pragma mark - 实现
@implementation BasicWebController


#pragma mark setter
- (void)setUrlString:(NSString *)urlString {
    _urlString = urlString;
    [self.web.webView loadRequest:({
        [NSURLRequest requestWithURL:kURLFromString(urlString)];
    })];
}

#pragma mark getter
- (BasicWebView *)web {
    if (!_web) {
        _web = [[BasicWebView alloc] initWithFrame:({
            CGFloat top = kNavigationBarHeight;
            CGFloat height = kScreenHeight - top;
            CGRectMake(0, top, kScreenWidth, height);
        }) canCopy:YES canZoom:NO];
        [self.view addSubview:_web];
    }
    return _web;
}


@end

