//
//  BasicNavController.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/10.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface BasicNavController : UINavigationController

/**
 *  @brief 返回到指定的类视图
 *  @param ClassName 类名
 *  @param animated  是否动画
 */
- (BOOL)popToAppointViewController:(NSString *)ClassName animated:(BOOL)animated;

/**
 *  @brief 获得当前导航器显示的视图
 *  @param ClassName 要获取的视图的名称
 *  @return 成功返回对应的对象，失败返回nil;
 */
- (instancetype)getCurrentViewControllerClass:(NSString *)ClassName;

@end

NS_ASSUME_NONNULL_END
