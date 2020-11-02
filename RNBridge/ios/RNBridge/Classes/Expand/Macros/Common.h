//
//  Common.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#ifndef Common_h
#define Common_h

#define kImageNamed(imageName)              [UIImage imageNamed:imageName]
#define kURLFromString(str)                 [NSURL URLWithString:str]
#define kFormatString(string, args...)      [NSString stringWithFormat:string, args]


#pragma mark - 尺寸
#define kStatusBarHeight        ((IS_IPHONEX || IS_IPHONEXR) ? 44.f : 20.f)
#define kSafeAreaBottomHeight   (IS_IPHONEX || IS_IPHONEXR ? 34 : 0)
#define kTabbarHeight           (49.f + kSafeAreaBottomHeight)
#define kNavigationBarHeight    (44.f + kStatusBarHeight)
#define kScreenWidth            ([UIScreen mainScreen].bounds.size.width)
#define kScreenHeight           ([UIScreen mainScreen].bounds.size.height)
#define kScreenBounds           ([UIScreen mainScreen].bounds)

#define kWindow                 [UIApplication sharedApplication].keyWindow
#define kUserDefaults           [NSUserDefaults standardUserDefaults]
#define kAppDelegate            [AppDelegate shareAppDelegate]
#define kApplication            [UIApplication sharedApplication]
#define kNotificationCenter     [NSNotificationCenter defaultCenter]

#define kFontLight(A)           [UIFont systemFontOfSize:[UIFont adjustFontSize:A] weight:UIFontWeightLight]
#define kFontNormal(A)          [UIFont systemFontOfSize:[UIFont adjustFontSize:A] weight:UIFontWeightRegular]
#define kFontBold(A)            [UIFont systemFontOfSize:[UIFont adjustFontSize:A] weight:UIFontWeightBold]
#define kFontHeavy(A)           [UIFont systemFontOfSize:[UIFont adjustFontSize:A] weight:UIFontWeightHeavy]
#define kFontBlack(A)           [UIFont systemFontOfSize:[UIFont adjustFontSize:A] weight:UIFontWeightBlack]


#define kVersion                [NSString stringWithFormat:@"%@", [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]]



#pragma mark - iPhone iPad
#define IS_IPHONE (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)
#define IS_PAD (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)


#pragma mark - 获取系统版本
#define iOSVersion      [[[UIDevice currentDevice] systemVersion] floatValue]
#define iOS7Later       ([UIDevice currentDevice].systemVersion.floatValue >= 7.0f)
#define iOS8Later       ([UIDevice currentDevice].systemVersion.floatValue >= 8.0f)
#define iOS9Later       ([UIDevice currentDevice].systemVersion.floatValue >= 9.0f)
#define iOS10Later      ([UIDevice currentDevice].systemVersion.floatValue >= 10.0f)
#define iOS11Later      ([UIDevice currentDevice].systemVersion.floatValue >= 11.0f)
#define iOS12Later      ([UIDevice currentDevice].systemVersion.floatValue >= 12.0f)
#define iOS13Later      ([UIDevice currentDevice].systemVersion.floatValue >= 13.0f)



#pragma mark - 手机型号
#define IS_IPHONEXR         (kScreenWidth == 414.f && kScreenHeight == 896.f ? YES : NO)
#define IS_IPHONEX          (kScreenWidth == 375.f && kScreenHeight == 812.f ? YES : NO)
#define IS_IPHONE11         (kScreenWidth == 828.f && kScreenHeight == 1792.f ? YES : NO)
#define IS_IPHONE11Pro      (kScreenWidth == 1125.f && kScreenHeight == 2436.f ? YES : NO)
#define IS_IPHONE11ProMax   (kScreenWidth == 1242.f && kScreenHeight == 2688.f ? YES : NO)

#define IS_IPHONE_5         ([[UIScreen mainScreen] bounds].size.height == 568.0f)
#define IS_IPHONE_6         ([[UIScreen mainScreen] bounds].size.height == 667.0f)
#define IS_IPHONE_6_PLUS    ([[UIScreen mainScreen] bounds].size.height == 736.0f)
#define IS_IPHONE_6_PLUS_UP ([[UIScreen mainScreen] bounds].size.height > 736.0f)


#pragma mark - 颜色
#define kClearColor                 [UIColor clearColor]
#define kWhiteColor                 UIColorFromRGB(0xffffff)
#define kBlackColor                 UIColorFromRGB(0x000000)
#define kRandColor                  kRGB(arc4random() % 255 / 255.0, arc4random() % 255 / 255.0, arc4random() % 255 / 255.0)


/// 主颜色
#define kMainColor                  UIColorFromRGB(0xf53535)
#define kMainDarkColor              UIColorFromRGB(0xed3232)
/// 默认页面背景色
#define kDefaultBackGroundColor     UIColorFromRGB(0xEEEEEE)
/// 主要字体颜色
#define kMainTextColor              UIColorFromRGB(0x333333)
#define kMainTextDarkColor          UIColorFromRGB(0x222222)
/// 次要字体颜色
#define kSecondaryTextColor         UIColorFromRGB(0x8F8983)
/// 辅助字体颜色
#define kAuxiliaryFontColor         UIColorFromRGB(0xB8B1A9)
/// 分割线浅灰色
#define kLineColor                  UIColorFromRGB(0xf6f6f6)
/// 其他
#define kPageDefaultColor           UIColorFromRGB(0x828CA1)
/// 获取验证码颜色
#define kCodeColor                  UIColorFromRGB(0xFF8D85)


/// 无网络连接
#define kNetworkReachabilityStatusNotReachable @"kNetworkReachabilityStatusNotReachable"
/// 移动蜂窝网络
#define kNetworkReachabilityStatusReachableViaWWAN @"kNetworkReachabilityStatusReachableViaWWAN"
/// wifi网络
#define kNetworkReachabilityStatusReachableViaWiFi @"kNetworkReachabilityStatusReachableViaWiFi"
/// 无法获取网络状态
#define kNetworkReachabilityStatusUnknown @"kNetworkReachabilityStatusUnknown"

/// 滚动开始
#define kScrollViewBeginScroll @"kScrollViewBeginScroll"
/// 正在滚动
#define kScrollViewDidScroll @"kScrollViewDidScroll"
/// 滚动停止
#define kScrollViewEndScroll @"kScrollViewEndScroll"


#define kHomeListTag 1000


#endif

