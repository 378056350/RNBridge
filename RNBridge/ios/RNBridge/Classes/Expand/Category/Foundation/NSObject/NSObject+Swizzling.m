//
//  NSObject+Swizzling.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/11/5.
//  Copyright © 2019 nko. All rights reserved.
//

#import "NSObject+Swizzling.h"
#import <objc/runtime.h>

@implementation NSObject (Swizzling)

+ (void)swizzlingInClass:(Class)cls originalSelector:(SEL)originalSelector swizzledSelector:(SEL)swizzledSelector {
    Class class = cls;
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);

    BOOL didAddMethod =
    class_addMethod(class,
                    originalSelector,
                    method_getImplementation(swizzledMethod),
                    method_getTypeEncoding(swizzledMethod));

    if (didAddMethod) {
        class_replaceMethod(class,
                            swizzledSelector,
                            method_getImplementation(originalMethod),
                            method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
    
//    Method origMethod = class_getInstanceMethod([self class], originalSelector);
//    Method replaceMethod = class_getInstanceMethod([self class], swizzledSelector);
//
//    BOOL didAddMethod =
//    class_addMethod([self class],
//                    originalSelector,
//                    method_getImplementation(replaceMethod),
//                    method_getTypeEncoding(replaceMethod));
//    
//    if (didAddMethod) {
//        class_replaceMethod([self class],
//                            swizzledSelector,
//                            method_getImplementation(replaceMethod),
//                            method_getTypeEncoding(replaceMethod));
//    } else {
//        method_exchangeImplementations(origMethod, replaceMethod);
//    }
    
}

- (void)wk_swizzleInstanceSelector:(SEL)origSel_ replaceSelector:(SEL)replaceSel_ {
    Method origMethod = class_getInstanceMethod([self class], origSel_);
    Method replaceMethod = class_getInstanceMethod([self class], replaceSel_);

    BOOL didAddMethod =
    class_addMethod([self class],
                    origSel_,
                    method_getImplementation(replaceMethod),
                    method_getTypeEncoding(replaceMethod));
    
    if (didAddMethod) {
        class_replaceMethod([self class],
                            replaceSel_,
                            method_getImplementation(replaceMethod),
                            method_getTypeEncoding(replaceMethod));
    } else {
        method_exchangeImplementations(origMethod, replaceMethod);
    }
}

@end
