//
//  RNRootView.h
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNRootView : UIView

@property (nonatomic, strong) RCTRootView *rootView;
@property (nonatomic, strong) NSDictionary *props;

@end

NS_ASSUME_NONNULL_END
