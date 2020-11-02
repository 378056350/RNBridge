//
//  RNBridgeDownloadManager.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <SSZipArchive.h>
#import <CommonCrypto/CommonDigest.h>
#import "RNBridgeDownloadManager.h"
#import "RNBridgeUtil.h"

#pragma mark - 声明
@interface RNBridgeDownloadManager ()

@end


#pragma mark - 实现
@implementation RNBridgeDownloadManager


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
       completeHandler:(void(^)(BOOL success, NSString *bundlePath))completeHandle {
    
    NSString *desPath = [RNBridgeUtil loadZipPath:moduleName];
    NSString *desPathDir = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:@"BundleDownloaded"];
    NSString *subScriptDir = [@"Bundles" stringByAppendingPathComponent:moduleName];
    NSString *bundlePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:subScriptDir];
    
    // 文件存在
    if ([RNBridgeDownloadManager judgePathExist:desPath]) {
        // md5相同
        if ([md5 isEqualToString:[RNBridgeUtil loadMd5:desPath]]) {
            completeHandle(true, bundlePath);
            return;
        }
        // md5不相同
        else {
            // 移除文件
            [self removeZipPath:desPath unZipPath:bundlePath];
        }
    }
    
    // 下载文件
    NSURL *url = [NSURL URLWithString:urlStr];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDownloadTask *downloadTask = [session downloadTaskWithRequest:request completionHandler:^(NSURL * _Nullable location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        // 下载失败
        if (error != nil) {
            completeHandle(false, nil);
            return;
        }
        
        // 获取文件管理器
        NSFileManager *mgr = [NSFileManager defaultManager];
        [mgr createDirectoryAtPath:subScriptDir withIntermediateDirectories:YES attributes:nil error:nil];
        [mgr createDirectoryAtPath:desPathDir withIntermediateDirectories:YES attributes:nil error:nil];
        
        NSError *moveError = nil;
        [mgr removeItemAtURL:[NSURL fileURLWithPath:desPath] error:nil];
        [mgr moveItemAtURL:location toURL:[NSURL fileURLWithPath:desPath] error:&moveError];
        
        if (moveError != nil) {
            NSLog(@"转存失败 %ld",(long)moveError.code);
            // 文件存在
            if (moveError.code != 516) {
                completeHandle(false, nil);
                return;
            }
        }
        // 解压文件
        @try {
            // 解压成功
            [SSZipArchive unzipFileAtPath:desPath toDestination:bundlePath];
            completeHandle(true, bundlePath);
        }
        @catch (NSException *exception) {
            // 解压失败
            completeHandle(false, nil);
        }
    }];
    [downloadTask resume];
}

/**
 *  文件是否存在
 *
 *  @param filePath 文件路径
 */
+ (BOOL)judgePathExist:(NSString * )filePath {
    NSFileManager *fm = [NSFileManager defaultManager];
    return [fm fileExistsAtPath:filePath];
}

/**
 *  删除压缩文件 && 解压文件
 *
 *  @param zipPath 压缩路径
 *  @param unZipPath 解压路径
 */
- (void)removeZipPath:(NSString *)zipPath unZipPath:(NSString *)unZipPath {
    NSFileManager *fm = [NSFileManager defaultManager];
    [fm removeItemAtPath:zipPath error:nil];
    [fm removeItemAtPath:unZipPath error:nil];
}


@end

