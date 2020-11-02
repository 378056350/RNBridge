//
//  RNBridgeModel.m
//  RNBridge
//
//  Created by 郑业强 on 2020/10/29.
//

#import "RNBridgeModel.h"

@implementation RNBridgeModel

- (instancetype)init {
    if (self = [super init]) {
        self.number = 0;
        self.errorNumber = 0;
        self.animation = true;
        self.loadComplete = false;
        self.loadError = false;
        self.loadCommonBundle = false;
        self.uninstall = false;
    }
    return self;
}

- (RNRootView *)view {
    if (!_view) {
        _view = [[RNRootView alloc] init];
    }
    return _view;
}

- (NSString *)uuid {
    if (!_uuid) {
        _uuid = [NSString uuidString];
    }
    return _uuid;
}

- (NSDictionary *)props {
    if (!_props) {
        return @{@"uuid": self.uuid};
    }
    return _props;
}

- (NSMutableSet *)vcs {
    if (!_vcs) {
        _vcs = [NSMutableSet set];
    }
    return _vcs;
}

- (void)install {
    dispatch_async(dispatch_get_main_queue(), ^{
        RCTRootView *root = [[RCTRootView alloc] initWithBridge:self.bridge moduleName:self.name initialProperties:self.props];
        [self.view setRootView:root];
    });
}

- (BOOL)isEqual:(id)object {
    if ([object isKindOfClass:[RNBridgeModel class]]) {
        RNBridgeModel *model = (RNBridgeModel *)object;
        if ([model.name isEqualToString:self.name]) {
            return true;
        }
    }
    return false;
}


@end
