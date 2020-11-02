import React from 'react';
import {AppRegistry} from 'react-native';
import Hot from '~pages/hot/page/hot';

const HotProvider = () => {
  return <Hot />;
};

AppRegistry.registerComponent('hot', () => HotProvider);

export default HotProvider;
