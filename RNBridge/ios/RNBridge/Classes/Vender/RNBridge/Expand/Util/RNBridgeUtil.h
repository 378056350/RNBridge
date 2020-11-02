//
//  RNBridgeUtil.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNBridgeUtil : NSObject

/**
 *  JSON 转 NString
 */
+ (NSString *)convertToJsonData:(NSArray *)dict;

/**
 *  String 转 JSON
 */
+ (id)dictionaryWithJsonString:(NSString *)jsonString;

/**
 *  获取md5
 *
 *  @param path 文件路径
 *  @return md5
 */
+ (NSString *)loadMd5:(NSString *)path;

/**
 *  获取压缩文件路径
 *
 *  @param bundleName 库名
 */
+ (NSString *)loadZipPath:(NSString *)bundleName;

/**
 *  获取解压文件路径
 *
 *  @param bundleName 库名
 *  @return 路径
 */
+ (NSString *)loadUnZipPath:(NSString *)bundleName;

@end

NS_ASSUME_NONNULL_END
