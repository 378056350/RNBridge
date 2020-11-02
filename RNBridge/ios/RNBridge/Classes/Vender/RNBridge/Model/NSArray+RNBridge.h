//
//  NSArray+RNBridge.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/30.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSArray (RNBridge)

- (RNBridgeModel *)objectAtName:(NSString *)name;

@end

NS_ASSUME_NONNULL_END
