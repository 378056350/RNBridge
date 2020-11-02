//
//  RNBridgeModel.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <Foundation/Foundation.h>
#import "RNRootView.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNBridgeModel : NSObject


/// RN控件
@property (nonatomic, strong, nullable) RNRootView *view;
/// uuid
@property (nonatomic, strong) NSString *uuid;
/// 参数
@property (nonatomic, strong) NSDictionary *props;

/// Bridge
@property (nonatomic, strong, nullable) RCTBridge *bridge;
/// 库名
@property (nonatomic, strong) NSString *name;
/// 路径
@property (nonatomic, strong) NSString *path;
/// 唯一标识
@property (nonatomic, strong) NSString *md5;
/// View所在的控制器
@property (nonatomic, strong) NSMutableSet *vcs;

/**
 *  引用次数
 *  跟OC引用计数类似,每次加载库number+1,卸载库number-1,
 *  引用次数为0时销毁控件
 */
@property (nonatomic, assign) NSInteger number;

/**
 *  失败次数
 *  失败次数指该库加载失败次数
 *  当库加载失败时, 失败次数+1, 超过2次则跳过此次加载循环
 */
@property (nonatomic, assign) NSInteger errorNumber;
/// 跳转动画
@property (nonatomic, assign) BOOL animation;
/// 加载完成
@property (nonatomic, assign) BOOL loadComplete;
/// 加载失败
@property (nonatomic, assign) BOOL loadError;
/// 加载完Common库
@property (nonatomic, assign) BOOL loadCommonBundle;
/// 卸载
@property (nonatomic, assign) BOOL uninstall;

- (void)install;


@end

NS_ASSUME_NONNULL_END
