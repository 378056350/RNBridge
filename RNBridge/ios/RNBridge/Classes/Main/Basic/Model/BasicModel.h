//
//  BasicModel.h
//  Bookkeeping
//
//  Created by 郑业强 on 2020/4/12.
//  Copyright © 2020 kk. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface BasicModel : NSObject

@property (nonatomic, assign) NSInteger code;
@property (nonatomic, assign) BOOL flag;
@property (nonatomic, copy  ) NSString *message;

@end

NS_ASSUME_NONNULL_END
