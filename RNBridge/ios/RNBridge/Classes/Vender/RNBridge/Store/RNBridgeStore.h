//
//  RNBridgeStore.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <Foundation/Foundation.h>
#import "RNBridgeModel.h"

NS_ASSUME_NONNULL_BEGIN

#pragma mark - 声明
@interface RCTBridge (PackageBundle)

- (RCTBridge *)batchedBridge;
- (void)executeSourceCode:(NSData *)sourceCode sync:(BOOL)sync;

@end


/**
 *  1.下载
 *  需要下载的时候再下载
 *  下载前是否显示本地控件可配置
 *
 *  2.卸载时机
 *  安装与卸载均需要加锁
 *  安装: 在上一个页面加载完View,下一个页面的ViewDidLoad直接显示(ViewDidLoad)
 *  卸载: 在安装完成后再进行卸载(ViewDidDisappear/Pop/Dismiss)
 *
 *  3.使用场景
 *      1.进入程序后获取配置
 *      2.到了某个页面临时获取配置
 *      3.
 */
@interface RNBridgeStore : NSObject

singleton_interface(RNBridgeStore)

@property (nonatomic, strong) NSMutableArray<RNBridgeModel *> *models;

//@property (nonatomic, strong) NSDictionary *launchOptions;
//
///// 安装库
//- (void)preLoadInstalls:(__kindof NSArray<RNBridgeModel *> *)models;
///// 安装库
//- (void)preLoadInstall:(RNBridgeModel *)model;
//
///// 卸载库
//- (void)preLoadUnInstalls:(__kindof NSArray<NSString *> *)names;
///// 卸载库
//- (void)preLoadUnInstall:(NSString *)name;
//
//
///**
// *  查找已加载控件
// */
//- (RNBridgeModel *)loadRnModel:(NSString *)name;


/// 添加库
- (void)insertBundles:(__kindof NSArray<RNBridgeModel *> *)bundles;

- (void)insertBundle:(RNBridgeModel *)bundle;

/// 安装库
- (void)installBundles:(__kindof NSArray<NSString *> *)names;

- (void)installBundle:(NSString *)name;

/// 卸载库
- (void)uninstallBundles:(__kindof NSArray<NSString *> *)names;

- (void)uninstallBundle:(NSString *)name;

/// 列表中查找库
- (RNBridgeModel *)findBundle:(NSString *)name;

// 输出信息
- (void)consoleLog;



@end

NS_ASSUME_NONNULL_END
