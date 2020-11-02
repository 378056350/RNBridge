//
//  BasicTableCell.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import "BasicTableCell.h"

#pragma mark - 声明
@interface BasicTableCell ()


@end


#pragma mark - 实现
@implementation BasicTableCell


#pragma mark 初始化
+ (instancetype)loadFirstNib:(UITableView *)table {
    BasicTableCell *cell = [self loadNib:0 frame:table];
    return cell;
}

+ (instancetype)loadLastNib:(UITableView *)table {
    NSInteger index = [self getCells].count - 1;
    BasicTableCell *cell = [self loadNib:index frame:table];
    return cell;
}

+ (instancetype)loadNib:(NSInteger)index frame:(UITableView *)table {
    NSString *name = NSStringFromClass(self);
    BasicTableCell *cell = [table dequeueReusableCellWithIdentifier:name];
    if (!cell) {
        cell = [[NSBundle mainBundle] loadNibNamed:name owner:nil options:nil][index];
    }
    [cell initUI];
    [cell initEvent];
    return cell;
}

+ (instancetype)loadCode:(UITableView *)table {
    // 注册
    NSString *name = NSStringFromClass(self);
    [table registerClass:self forCellReuseIdentifier:name];
    // 生成cell
    BasicTableCell *cell = [table dequeueReusableCellWithIdentifier:name];
    if (!cell) {
        cell = [[self alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:name];
    }
    [cell setTable:table];
    [cell initUI];
    [cell initEvent];
    return cell;
}

+ (NSArray *)getCells {
    NSString *name = NSStringFromClass(self);
    return [[NSBundle mainBundle] loadNibNamed:name owner:nil options:nil];
}


#pragma mark UI、数据
- (void)initUI {
    [self setBackgroundColor:kClearColor];
    [self setClipsToBounds:false];
    [self.layer setMasksToBounds:false];
    [self.contentView setClipsToBounds:false];
    [self.contentView.layer setMasksToBounds:false];
    [self.contentView setBackgroundColor:kDefaultBackGroundColor];
    [self setSelectionStyle:UITableViewCellSelectionStyleNone];
}

- (void)initEvent {
    
}


@end
