import React from 'react';
import {AppRegistry} from 'react-native';
import {StoreContext} from 'redux-react-hook';
import Coupon from '~pages/coupon/page/coupon';
import store from '~pages/coupon/store';

const CouponProvider = (props) => {
  return (
    <StoreContext.Provider value={store}>
      <Coupon {...props} />
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent('coupon', () => CouponProvider);

export default CouponProvider;
