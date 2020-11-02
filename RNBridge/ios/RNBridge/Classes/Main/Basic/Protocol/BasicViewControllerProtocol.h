//
//  BasicViewControllerProtocol.h
//  Bookkeeping
//
//  Created by 郑业强 on 2020/4/12.
//  Copyright © 2020 kk. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BasicViewControllerProtocol <NSObject>

@required
/**
 *  @brief 初始化UI
 */
- (void)initUI;

/**
 *  @brief 初始化Event
 */
- (void)initEvent;

@end

NS_ASSUME_NONNULL_END
