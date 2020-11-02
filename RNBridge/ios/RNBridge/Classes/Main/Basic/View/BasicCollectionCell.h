//
//  BasicCollectionCell.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BasicCollectionCellProtocol.h"

NS_ASSUME_NONNULL_BEGIN

#pragma mark - 代理
@class BasicCollectionCell;
@protocol BasicCollectionCellDelegate <NSObject>

@optional
- (void)collectionCell:(__kindof BasicCollectionCell *)cell didSelectItemAtIndexPath:(NSIndexPath *)indexPath;

@end


#pragma mark - 声明
@interface BasicCollectionCell : UICollectionViewCell<BasicCollectionCellProtocol>

@property (nonatomic, weak  ) id<BasicCollectionCellDelegate> delegate;
@property (nonatomic, strong) NSIndexPath *indexPath;

@end

NS_ASSUME_NONNULL_END
