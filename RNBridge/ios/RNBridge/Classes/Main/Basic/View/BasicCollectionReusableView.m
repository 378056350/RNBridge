//
//  BasicCollectionReusableView.m
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import "BasicCollectionReusableView.h"

#pragma mark - 声明
@interface BasicCollectionReusableView ()

@end


#pragma mark - 实现
@implementation BasicCollectionReusableView

+ (instancetype)initWithCollection:(UICollectionView *)collection kind:(NSString *)kind indexPath:(NSIndexPath *)indexPath {
    NSString *identifier = NSStringFromClass(self);
    // 注册
    [collection registerClass:[self class] forSupplementaryViewOfKind:kind withReuseIdentifier:identifier];
    // 生成
    BasicCollectionReusableView *view = [collection dequeueReusableSupplementaryViewOfKind:kind withReuseIdentifier:identifier forIndexPath:indexPath];
    [view initUI];
    [view initEvent];
    return view;
}

- (void)initUI {
    
}

- (void)initEvent {
    
}

@end
