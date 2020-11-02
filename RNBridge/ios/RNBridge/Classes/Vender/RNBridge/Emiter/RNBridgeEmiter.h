//
//  RNBridgeEmiter.h
//  AwesomeProject
//
//  Created by 郑业强 on 2020/10/6.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <ReactiveObjC.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNBridgeEmiter : RCTEventEmitter<RCTBridgeModule>

+ (instancetype)sharedSingleton;

@end

NS_ASSUME_NONNULL_END
