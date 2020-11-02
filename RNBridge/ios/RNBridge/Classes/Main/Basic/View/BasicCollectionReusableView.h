//
//  BasicCollectionReusableView.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BasicCollectionReusableViewProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface BasicCollectionReusableView : UICollectionReusableView<BasicCollectionReusableViewProtocol>

+ (instancetype)initWithCollection:(UICollectionView *)collection kind:(NSString *)kind indexPath:(NSIndexPath *)indexPath;

@end

NS_ASSUME_NONNULL_END
