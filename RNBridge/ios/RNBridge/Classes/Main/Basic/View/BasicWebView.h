//
//  BasicWebView.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BasicWebView : UIView

@property (nonatomic, strong) WKWebView *webView;

- (instancetype)initWithFrame:(CGRect)frame canCopy:(BOOL)canCopy canZoom:(BOOL)canZoom;

@end

NS_ASSUME_NONNULL_END
