import React from 'react';
import {AppRegistry} from 'react-native';
import Good from '~pages/good/page/good';

const GoodProvider = () => {
  return <Good />;
};

AppRegistry.registerComponent('good', () => GoodProvider);

export default GoodProvider;
