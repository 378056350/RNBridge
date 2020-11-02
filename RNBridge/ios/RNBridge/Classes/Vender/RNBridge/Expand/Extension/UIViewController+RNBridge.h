//
//  UIViewController+RNBridge.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIViewController (RNBridge)

/// 加载库
@property (nonatomic, strong) NSArray<RNBridgeModel *> *bundles;
/// 预加载库
@property (nonatomic, strong) NSArray<RNBridgeModel *> *prebundles;
/// 唯一标识
@property (nonatomic, strong) NSString *uuid;

/**
 *  获取当前控制器
 */
+ (UIViewController *)getCurrentActivityViewController;

@end

NS_ASSUME_NONNULL_END
