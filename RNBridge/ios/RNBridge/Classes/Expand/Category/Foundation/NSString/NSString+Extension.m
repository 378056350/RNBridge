//
//  NSString+Extension.m
//  HealthWatch
//
//  Created by 郑业强 on 2020/10/23.
//

#import "NSString+Extension.h"
#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonDigest.h>

@implementation NSString (Extension)

+ (NSString *)uuidString {
    CFUUIDRef uuid = CFUUIDCreate(NULL);
    NSString *UUID = (__bridge_transfer NSString *)CFUUIDCreateString(NULL, uuid);
    CFRelease(uuid);
    return UUID;
}

@end
