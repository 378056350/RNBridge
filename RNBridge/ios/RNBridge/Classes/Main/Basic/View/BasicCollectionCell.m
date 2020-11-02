//
//  BasicCollectionCell.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import "BasicCollectionCell.h"

#pragma mark - 声明
@interface BasicCollectionCell ()

@end


#pragma mark - 实现
@implementation BasicCollectionCell

+ (instancetype)loadCode:(UICollectionView *)collection index:(NSIndexPath *)index {
    // 注册
    [collection registerClass:[self class] forCellWithReuseIdentifier:NSStringFromClass(self)];
    // 生成cell
    NSString *identifier = NSStringFromClass(self);
    BasicCollectionCell *cell = [collection dequeueReusableCellWithReuseIdentifier:identifier forIndexPath:index];
    [cell setIndexPath:index];
    [cell initUI];
    [cell initEvent];
    return cell;
}

- (void)initUI {
    
}

- (void)initEvent {
    
}

+ (CGSize)createSize {
    return CGSizeZero;
}

+ (CGSize)createSizeWithModel:(id)model {
    return CGSizeZero;
}

+ (CGSize)createSizeWithIndex:(NSIndexPath *)indexPath {
    return CGSizeZero;
}

+ (CGFloat)createNumbers {
    return 0;
}

+ (CGFloat)createNumbers:(id)model {
    return 0;
}

+ (CGSize)createSectionHeaderHeight {
    return CGSizeZero;
}

+ (CGSize)createSectionFooterHeight {
    return CGSizeZero;
}

+ (CGFloat)createItemHeight {
    return 0;
}

+ (CGFloat)createLineHeight {
    return 0;
}


@end

