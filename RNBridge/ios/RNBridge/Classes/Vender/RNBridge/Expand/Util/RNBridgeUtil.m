//
//  RNBridgeUtil.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "RNBridgeUtil.h"
#import <SSZipArchive.h>
#import <CommonCrypto/CommonDigest.h>

@implementation RNBridgeUtil

/**
 *  JSON 转 NString
 *
 *  @return JSON字符串
 */
+ (NSString *)convertToJsonData:(NSArray *)dict {
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:0 error:0];
  NSString *dataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  return dataStr;
}

/**
 *  String 转 JSON
 *
 *  @return JSON
 */
+ (id)dictionaryWithJsonString:(NSString *)jsonString {
  if (jsonString == nil) {
    return nil;
  }
  NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  NSError *err;
  NSArray *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                      options:NSJSONReadingMutableContainers
                                                        error:&err];
  if(err) {
    return nil;
  }
  return dic;
}

/**
 *  获取md5
 *
 *  @param path 文件路径
 *  @return md5
 */
+ (NSString *)loadMd5:(NSString *)path {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:path isDirectory:nil]) {
        NSData *data = [NSData dataWithContentsOfFile:path];
        unsigned char digest[CC_MD5_DIGEST_LENGTH];
        CC_MD5(data.bytes, (CC_LONG)data.length, digest);
        NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
        for( int i = 0; i < CC_MD5_DIGEST_LENGTH; i++) {
            [output appendFormat:@"%02x", digest[i]];
        }
        return output;
    } else {
        return @"";
    }
}

/**
 *  获取压缩文件路径
 *
 *  @param bundleName 库名
 */
+ (NSString *)loadZipPath:(NSString *)bundleName {
    NSString *fileName = [NSString stringWithFormat:@"%@.zip", bundleName];
    NSString *subDir = [@"BundleDownloaded" stringByAppendingPathComponent:fileName];
    NSString *desPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:subDir];
    return desPath;
}

/**
 *  获取解压文件路径
 *
 *  @param bundleName 库名
 *  @return 路径
 */
+ (NSString *)loadUnZipPath:(NSString *)bundleName {
    NSString *subScriptDir = [@"Bundles" stringByAppendingPathComponent:bundleName];
    NSString *bundlePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:subScriptDir];
    return [NSString stringWithFormat:@"%@/%@.bundle", bundlePath, bundleName];
}


@end
