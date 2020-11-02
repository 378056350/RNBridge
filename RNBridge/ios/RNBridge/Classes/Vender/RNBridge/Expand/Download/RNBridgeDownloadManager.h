//
//  RNBridgeDownloadManager.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNBridgeDownloadManager : NSObject

/**
 *  下载库
 *
 *  @param urlStr 下载链接
 *  @param moduleName 库名
 *  @param md5 唯一标识
 *  @param completeHandle 回调
 */
- (void)downloadBundle:(NSString *)urlStr
            moduleName:(NSString *)moduleName
                   md5:(NSString *)md5
       completeHandler:(void(^)(BOOL success, NSString *bundlePath))completeHandler;

@end

NS_ASSUME_NONNULL_END
