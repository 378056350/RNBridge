//
//  RealmManager.m
//  Realm
//
//  Created by 郑业强 on 2020/8/1.
//  Copyright © 2020 KK. All rights reserved.
//

#import "RealmManager.h"


#define kNewVersion 1

#pragma mark - 声明
@interface RealmManager ()

@property (nonatomic, strong) RLMNotificationToken *token;
@property (nonatomic, strong) RLMRealmConfiguration *configuration;

@end


#pragma mark - 实现
@implementation RealmManager


#pragma mark 初始化
// 单例化
+ (instancetype)shareInstense {
    static RealmManager *manager = nil;
    @synchronized (self) {
        if (!manager) {
            manager = [[RealmManager alloc] init];
            [manager configuration];
            [manager realm];
        }
    }
    return manager;
}


#pragma mark - getter
- (RLMRealmConfiguration *)configuration {
    if (!_configuration) {
        _configuration = [RLMRealmConfiguration defaultConfiguration];
        [_configuration setSchemaVersion:kNewVersion];
        [_configuration setMigrationBlock:^(RLMMigration *migration, uint64_t oldSchemaVersion) {
//            if (oldSchemaVersion < kNewVersion) {
//                if (kNewVersion == 2) {
//                    [migration enumerateObjects:@"Person" block:^(RLMObject *oldObject, RLMObject *newObject) {
//                        newObject[@"age"] = @(5);
//                    }];
//                }
//                else if (kNewVersion == 3) {
//                    [migration renamePropertyForClass:@"Person" oldName:@"name" newName:@"name1"];
//                }
//            }
        }];
        [RLMRealmConfiguration setDefaultConfiguration:_configuration];
    }
    return _configuration;
}

- (RLMRealm *)realm {
    if (!_realm) {
        _realm = [RLMRealm defaultRealm];
    }
    return _realm;
}

- (void)asd {
//    // 获取通知
//    self.token = [self.realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
//        NSLog(@"接收到变更通知--%@", notification);
//    }];
    
    
    
//    // 添加
//    RealmModel *model1 = [[RealmModel alloc] initWithValue:@{@"Id": @(1), @"name": @"张三"}];
//    RealmModel *model2 = [[RealmModel alloc] initWithValue:@{@"Id": @(2), @"name": @"李四"}];
//    [self.realm transactionWithBlock:^{
//        [self.realm addObject:model1];
//    }];
//    [self.realm transactionWithBlock:^{
//        [self.realm addObject:model2];
//    }];
    
    
//    // 查询
//    RLMResults *resArr = [RealmModel allObjects];
//    NSLog(@"%@", resArr);
    
//    // 删除
//    [self.realm transactionWithBlock:^{
//        [self.realm deleteObject:resArr[0]];
//    }];
    
    
}


@end
