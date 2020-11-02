//
//  RLMObject+Json.m
//  HealthWatch
//
//  Created by 郑业强 on 2020/10/26.
//

#import "RLMObject+Json.h"
#import <objc/runtime.h>

@implementation RLMObject (Json)

#pragma mark -模型转字典
- (NSMutableDictionary *)hd_keyValues {


    NSMutableDictionary *propertyDic = [NSMutableDictionary dictionaryWithCapacity:0];
    unsigned int outCount;


    //获取对象的属性列表
    objc_property_t *properties = class_copyPropertyList(NSClassFromString([[self class] className]), &outCount);

    for (int i = 0; i < outCount; i++) {

        NSString *name = [NSString stringWithCString:property_getName(properties[i]) encoding:NSUTF8StringEncoding];

        id value = [self valueForKey:name];

        if (value) {


            if ([value isKindOfClass:[RLMArray class]]) {//判断是否是数组

                //模型数组转字典数组成
               [propertyDic setObject:[self hd_keyValuesArrayWithObjectArray:value] forKey:name];

            }else{

               [propertyDic setObject:value forKey:name];

            }

        }
    }
    free(properties);


    return propertyDic;
}

#pragma mark - 模型数组 -> 字典数组
- (NSMutableArray *)hd_keyValuesArrayWithObjectArray:(NSArray *)objectArray {

    NSMutableArray *array = [[NSMutableArray alloc]init];

    for (RLMObject *obje in objectArray) {

        [array addObject:obje.hd_keyValues];

    }

    return array;

}

@end
