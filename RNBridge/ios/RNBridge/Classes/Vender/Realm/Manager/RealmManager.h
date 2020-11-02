//
//  RealmManager.h
//  Realm
//
//  Created by 郑业强 on 2020/8/1.
//  Copyright © 2020 KK. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RLMAddress.h"
#import "RLMObject+Json.h"

NS_ASSUME_NONNULL_BEGIN

@interface RealmManager : NSObject

@property (nonatomic, strong) RLMRealm *realm;

+ (instancetype)shareInstense;

@end

NS_ASSUME_NONNULL_END
