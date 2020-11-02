//
//  BasicTableCellProtocol.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BasicTableCellProtocol <NSObject>

@optional
/**
 *  @brief 加载第一个NIB
 *  @param table 列表
 */
+ (instancetype)loadFirstNib:(UITableView *)table;

/**
 *  @brief 加载最后一个nib
 *  @param table 列表
 */
+ (instancetype)loadLastNib:(UITableView *)table;

/**
 *  @brief 加载指定xib
 *  @param index nib文件中第几个nib
 *  @param table 列表
 */
+ (instancetype)loadNib:(NSInteger)index frame:(UITableView *)table;

/**
 *  @brief 获取XIB中cell个数
 */
+ (NSArray *)getCells;

/**
 *  @brief 从代码创建cell
 *  @param table 列表
 */
+ (instancetype)loadCode:(UITableView *)table;


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
