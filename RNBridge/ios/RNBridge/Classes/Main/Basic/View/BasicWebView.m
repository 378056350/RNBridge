//
//  NOBasicWebView.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//


#define kProgressViewHeight 1.0f
#define kMinimumFontSize    13.0f

#define kInteractionNoticeTheLogin @"requestAction"


#import "BasicWebView.h"

#pragma mark - 声明
@interface BasicWebView ()<WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler> {
    BOOL _canCopy;
    BOOL _canZoom;
}

@property (nonatomic, strong) UIProgressView *progressView;
@property (nonatomic, strong) WKWebViewConfiguration *configuration;
@property (nonatomic, assign) CGFloat progress;

@end


#pragma mark - 实现
@implementation BasicWebView


- (instancetype)initWithFrame:(CGRect)frame canCopy:(BOOL)canCopy canZoom:(BOOL)canZoom {
    if (self = [super initWithFrame:frame]) {
        _canCopy = canCopy;
        _canZoom = canZoom;
        
        [self webView];
        [self progressView];
    }
    return self;
}


#pragma mark KVO监听事件
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context{
    if ([keyPath isEqualToString:NSStringFromSelector(@selector(estimatedProgress))]&&object == _webView) {
        self.progress = self.webView.estimatedProgress;
    } else if ([keyPath isEqualToString:@"title"] && object == _webView) {
        [[(BasicViewController *)self.viewController customNavBar] setTitle:_webView.title];
    } else {
        [super observeValueForKeyPath:keyPath
                             ofObject:object
                               change:change
                              context:context];
    }
}

- (void)setProgress:(CGFloat)progress {
    _progress = progress;
    if (self.progressView.alpha == 0) {self.progressView.alpha = 1;}
    [self.progressView setProgress:progress animated:YES];
    if (progress >= 1) {
        
        [UIView animateWithDuration:0.8 animations:^{
            self.progressView.alpha = 0;
        } completion:^(BOOL finished) {
            self.progressView.progress = 0;
        }];
    }
}

- (NSString *)javascriptOfCSS:(BOOL)canCopy canZoom:(BOOL)canZoom {
    NSString *css = canCopy ? @"" : @"body{-webkit-user-select:none;-webkit-user-drag:none;}";
    NSMutableString *javascript = [NSMutableString string];
    [javascript appendString:@"var style = document.createElement('style');"];
    [javascript appendString:@"style.type = 'text/css';"];
    [javascript appendFormat:@"var cssContent = document.createTextNode('%@');", css];
    [javascript appendString:@"style.appendChild(cssContent);"];
    [javascript appendString:@"document.body.appendChild(style);"];
    [javascript appendString:@"document.documentElement.style.webkitTouchCallout='none';"];
    [javascript appendString:@"document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust= '100%';"];
    [javascript appendString:canZoom ? @"" : @"var script = document.createElement('meta');""script.name = 'viewport';""script.content=\"width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no\";""document.getElementsByTagName('head')[0].appendChild(script);"];
    return javascript;
}


#pragma mark - WKUIDelegate
- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        completionHandler();
    }]];
    [[self viewController] presentViewController:alert animated:YES completion:NULL];
}

- (void)webView:(WKWebView *)webView runJavaScriptConfirmPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(BOOL result))completionHandler {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        completionHandler(YES);
    }]];
    [alert addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction *action) {
        completionHandler(NO);
    }]];
    [[self viewController] presentViewController:alert animated:YES completion:NULL];
}

- (void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(nullable NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * __nullable result))completionHandler {
    
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:prompt message:nil preferredStyle:UIAlertControllerStyleAlert];
    [alert addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.textColor = [UIColor blackColor];
        textField.placeholder = defaultText;
    }];
    
    [alert addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        completionHandler([[alert.textFields lastObject] text]);
    }]];
    
    [[self viewController] presentViewController:alert animated:YES completion:NULL];
}

- (WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures {
    
    //"webViewDidCreateWebView"
    if (!navigationAction.targetFrame.isMainFrame) {
        
        [webView loadRequest:navigationAction.request];
    }
    return nil;
}


#pragma mark - WKNavigationDelegate
- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation {
    NSLog(@"页面开始加载时调用");
}

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(null_unspecified WKNavigation *)navigation withError:(NSError *)error {
    NSLog(@"页面加载失败时调用");
    [self.progressView setProgress:0.0f animated:NO];
}

- (void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation {
    NSLog(@"当内容开始返回时调用");
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    NSLog(@"页面加载完成之后调用");
    // 传Token
    NSString *jsToken = [NSString stringWithFormat:@"setApiToken(\"%@\")", @"原生给JS的123131"];
    if ([jsToken isKindOfClass:[NSNull class]] || [jsToken length] == 0) {
        jsToken = @"";
    }
    [webView evaluateJavaScript:jsToken completionHandler:nil];
    
}

- (void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    NSLog(@"提交发生错误时调用");
    [self.progressView setProgress:0.0f animated:NO];
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationResponse:(WKNavigationResponse *)navigationResponse decisionHandler:(void (^)(WKNavigationResponsePolicy))decisionHandler {
    decisionHandler(WKNavigationResponsePolicyAllow);
}

- (void)webView:(WKWebView *)webView didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition, NSURLCredential *))completionHandler {
    completionHandler(NSURLSessionAuthChallengePerformDefaultHandling , nil);
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    
//#pragma mark - call tel:
//    NSURL *URL = navigationAction.request.URL;
//    NSString *scheme = [URL scheme];
//    if ([scheme isEqualToString:@"tel"]) {
//        NSString *resourceSpecifier = [URL resourceSpecifier];
//        [AppUtility callWithPhoneNumber:resourceSpecifier];
//    }
    
    decisionHandler(WKNavigationActionPolicyAllow);
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    
    // 登录: noticeTheLogin
    if ([message.name isEqualToString:kInteractionNoticeTheLogin]) {
        NSLog(@"123");
    }
}



#pragma mark getter
- (WKWebView *)webView {
    if (!_webView) {
        _webView = [[WKWebView alloc] initWithFrame:self.bounds configuration:self.configuration];
        [_webView setUIDelegate:self];
        [_webView addObserver:self
                   forKeyPath:@"estimatedProgress"
                      options:NSKeyValueObservingOptionNew
                      context:nil];
        [_webView addObserver:self
                   forKeyPath:NSStringFromSelector(@selector(estimatedProgress))
                      options:NSKeyValueObservingOptionNew
                      context:nil];
        [_webView addObserver:self
                   forKeyPath:@"title"
                      options:NSKeyValueObservingOptionNew
                      context:nil];
        // 认证信息
        [_webView evaluateJavaScript:@"navigator.userAgent" completionHandler:^(id _Nullable oldAgent, NSError * _Nullable error) {
            NSString *newAgent = [oldAgent stringByAppendingString:@"iPhone"];
            NSDictionary *dictionnary = [[NSDictionary alloc] initWithObjectsAndKeys:newAgent, @"UserAgent",nil];
            [[NSUserDefaults standardUserDefaults] registerDefaults:dictionnary];
        }];
        [_webView setUIDelegate:self];
        [_webView setNavigationDelegate:self];
        [self addSubview:_webView];
    }
    return _webView;
}

- (WKWebViewConfiguration *)configuration {
    if (!_configuration) {
        _configuration = [[WKWebViewConfiguration alloc] init];
        [_configuration setUserContentController:({
            WKUserScript *noneSelectScript = [[WKUserScript alloc] initWithSource:[self javascriptOfCSS:_canCopy canZoom:_canZoom] injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:YES];
            
            WKUserContentController *userContentController = [[WKUserContentController alloc] init];
            [userContentController addUserScript:noneSelectScript];
            userContentController;
        })];
        [_configuration setPreferences:({
            WKPreferences *preferences = [WKPreferences new];
            preferences.javaScriptCanOpenWindowsAutomatically = YES;
//            preferences.minimumFontSize = kMinimumFontSize;
            preferences.minimumFontSize = 0.1f;
            preferences;
        })];
        // 允许可以与网页交互，选择视图
        [_configuration setSelectionGranularity:false];
        // 使用h5的视频播放器在线播放, 还是使用原生播放器全屏播放
        [_configuration setAllowsInlineMediaPlayback:true];
        if (@available(iOS 9.0, *)) {
            // 允许视频播放
            [_configuration setAllowsAirPlayForMediaPlayback:true];
            [_configuration setAllowsPictureInPictureMediaPlayback:true];
            // 设置为NO则会允许自动播放
            [_configuration setRequiresUserActionForMediaPlayback:false];
            [_configuration setApplicationNameForUserAgent:@"iphone"];
        }
        // web内容处理池
        [_configuration setProcessPool:[[WKProcessPool alloc] init]];
        // 是否支持记忆读取
        [_configuration setSuppressesIncrementalRendering:true];
        if (@available(iOS 10.0, *)) {
            [_configuration setMediaTypesRequiringUserActionForPlayback:WKAudiovisualMediaTypeNone];
        }
        // 订单号
        [_configuration.userContentController addScriptMessageHandler:self name:kInteractionNoticeTheLogin];
    }
    return _configuration;
}

- (UIProgressView *)progressView {
    if (!_progressView) {
        _progressView = [[UIProgressView alloc] initWithProgressViewStyle:UIProgressViewStyleDefault];
        _progressView.frame = CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.width, kProgressViewHeight);
        _progressView.progressTintColor = kMainColor;
        _progressView.trackTintColor = [UIColor clearColor];
        [self insertSubview:_progressView aboveSubview:self.webView];
    }
    return _progressView;
}


#pragma mark dealloc
- (void)dealloc {
    [self.webView removeObserver:self forKeyPath:@"estimatedProgress"];
}



@end


