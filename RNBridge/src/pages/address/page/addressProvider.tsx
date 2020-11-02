import React from 'react';
import {AppRegistry} from 'react-native';
import {StoreContext} from 'redux-react-hook';
import Address from '~pages/address/page/address';
import store from '~pages/address/store';

const AddressProvider = (props) => {
  return (
    <StoreContext.Provider value={store}>
      <Address {...props} />
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent('address', () => AddressProvider);

export default AddressProvider;
