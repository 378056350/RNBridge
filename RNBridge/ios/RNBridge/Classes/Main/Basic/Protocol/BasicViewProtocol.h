//
//  BasicViewProtocol.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BasicViewProtocol <NSObject>

@optional
/**
 *  @brief 加载第一个nib
 *  @param frame 尺寸
 *  @return view对象
 */
+ (instancetype)loadFirstNib:(CGRect)frame;

/**
 *  @brief 加载最后一个nib
 *  @param frame 尺寸
 *  @return view对象
 */
+ (instancetype)loadLastNib:(CGRect)frame;

/**
 *  @brief 从代码创建view
 *  @param frame 尺寸
 *  @return view对象
 */
+ (instancetype)loadCode:(CGRect)frame;

/**
 *  @brief 加载指定nib
 *  @param index  nib文件中指定的nib位置
 *  @param frame 尺寸
 *  @return view对象
 */
+ (instancetype)loadNib:(NSInteger)index frame:(CGRect)frame;


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
