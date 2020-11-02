//
//  BasicTableCell.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BasicTableCellProtocol.h"

NS_ASSUME_NONNULL_BEGIN

#pragma mark 声明
@interface BasicTableCell : UITableViewCell<BasicTableCellProtocol>

/// 位置
@property (nonatomic, strong) NSIndexPath *indexPath;
/// 列表
@property (nonatomic, weak  ) UITableView *table;

@end

NS_ASSUME_NONNULL_END
