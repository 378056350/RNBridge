//
//  Single.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/11/5.
//  Copyright © 2019 nko. All rights reserved.
//

#ifndef Single_h
#define Single_h

// .h
#define singleton_interface(class) +(instancetype) shared##class;
// .m
#define singleton_implementation(class)         \
static class *_instance;                        \
                                                \
+ (id)allocWithZone : (struct _NSZone *) zone { \
    static dispatch_once_t onceToken;           \
    dispatch_once(&onceToken, ^{                \
        _instance = [super allocWithZone:zone]; \
    });                                         \
                                                \
    return _instance;                           \
}                                               \
                                                \
+ (instancetype)shared##class                   \
    {                                           \
    if (_instance == nil) {                     \
        _instance = [[class alloc] init];       \
    }                                           \
                                                \
    return _instance;                            \
}


#endif
