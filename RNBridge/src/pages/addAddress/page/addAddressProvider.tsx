import React from 'react';
import {AppRegistry} from 'react-native';
import AddAddress from '~pages/addAddress/page/addAddress';

const AddAddressProvider = (props) => {
  return <AddAddress {...props}/>;
};

AppRegistry.registerComponent('addAddress', () => AddAddressProvider);

export default AddAddressProvider;
