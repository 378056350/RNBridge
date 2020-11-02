//
//  NSObject+Swizzling.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/11/5.
//  Copyright © 2019 nko. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (Swizzling)

/** 响应交换 */
+ (void)swizzlingInClass:(Class)clsss
        originalSelector:(SEL)originalSelector
        swizzledSelector:(SEL)swizzledSelector;

- (void)wk_swizzleInstanceSelector:(SEL)origSel_ replaceSelector:(SEL)replaceSel_;

@end

NS_ASSUME_NONNULL_END
