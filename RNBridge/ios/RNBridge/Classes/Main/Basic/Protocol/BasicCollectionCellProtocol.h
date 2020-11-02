//
//  BasicCollectionCellProtocol.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BasicCollectionCellProtocol <NSObject>

@optional
/**
 *  @brief 从代码创建cell
 *  @param collection 列表
 *  @param index 位置
 */
+ (instancetype)loadCode:(UICollectionView *)collection index:(NSIndexPath *)index;

/**
 *  @brief 创建尺寸
 *  @return cell 尺寸
 */
+ (CGSize)createSize;

/**
 *  @brief 创建尺寸
 *  @param model 数据
 *  @return cell 尺寸
 */
+ (CGSize)createSizeWithModel:(id)model;

/**
 *  @brief 创建尺寸
 *  @param indexPath 位置
 *  @return cell 尺寸
 */
+ (CGSize)createSizeWithIndex:(NSIndexPath *)indexPath;

/**
 *  @brief 创建数量
 *  @return cell 个数
 */
+ (CGFloat)createNumbers;

/**
 *  @brief 创建数量
 *  @param model 数据
 *  @return cell 个数
 */
+ (CGFloat)createNumbers:(id)model;

/**
 *  @brief 创建顶部组间距
 *  @return 组间距
 */
+ (CGSize)createSectionHeaderHeight;

/**
 *  @brief 创建底部组间距
 *  @return 组间距
 */
+ (CGSize)createSectionFooterHeight;

/**
 *  @brief 创建Cell个间距
 *  @return Cell个间距
 */
+ (CGFloat)createItemHeight;

/**
 *  @brief 创建Cell行间距
 *  @return Cell行间距
 */
+ (CGFloat)createLineHeight;


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
