//
//  RLMObject+Json.h
//  HealthWatch
//
//  Created by 郑业强 on 2020/10/26.
//

#import "RLMObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface RLMObject (Json)

// 模型转字典
- (NSMutableDictionary *)hd_keyValues;

// 模型数组 -> 字典数组
- (NSMutableArray *)hd_keyValuesArrayWithObjectArray:(NSArray *)objectArray;

@end

NS_ASSUME_NONNULL_END
