//
//  BasicViewController.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BasicViewControllerProtocol.h"
#import "UIViewController+Basic.h"


NS_ASSUME_NONNULL_BEGIN

@interface BasicViewController : UIViewController<BasicViewControllerProtocol>

/// 返回按钮
@property (nonatomic, assign) BOOL isShowLiftBack;
/// 当前tabbar
@property (nonatomic, assign) NSInteger tabbarIndex;

- (void)pushPublishController;

@end

NS_ASSUME_NONNULL_END
