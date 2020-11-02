import React from 'react';
import { AppRegistry } from 'react-native';
import { StoreContext } from 'redux-react-hook';
import Order from '~pages/order/page/order';
import store from '~pages/order/store';

const OrderProvider = (props) => {
  return (
    <StoreContext.Provider value={store}>
      <Order {...props} />
    </StoreContext.Provider>
  )

};

AppRegistry.registerComponent('order', () => OrderProvider);

export default OrderProvider;
