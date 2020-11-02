//
//  NSArray+RNBridge.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/30.
//

#import "NSArray+RNBridge.h"

@implementation NSArray (RNBridge)

- (RNBridgeModel *)objectAtName:(NSString *)name {
    for (RNBridgeModel *model in self) {
        if ([model.name isEqualToString:name]) {
            return model;
        }
    }
    return nil;
}

@end
