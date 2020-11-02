//
//  RLMAddress.h
//  HealthWatch
//
//  Created by 郑业强 on 2020/10/23.
//

#import "RLMObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface RLMAddress : RLMObject

@property NSString *Id;
@property NSString *user;
@property NSString *phone;
@property NSString *province;
@property NSString *city;
@property NSString *area;
@property NSString *detail;
@property BOOL isDefault;

@end
RLM_ARRAY_TYPE(RLMAddress)

NS_ASSUME_NONNULL_END
