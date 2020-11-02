//
//  BasicCollectionReusableViewProtocol.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol BasicCollectionReusableViewProtocol <NSObject>

@optional
/**
 *  @brief 初始化
 */
+ (instancetype)initWithCollection:(UICollectionView *)collection kind:(NSString *)kind indexPath:(NSIndexPath *)indexPath;

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
