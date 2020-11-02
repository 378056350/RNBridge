import React from 'react';
import {AppRegistry} from 'react-native';
import Mine from '~pages/mine/page/mine';

const MineProvider = (props) => {
  return <Mine {...props}/>;
};

AppRegistry.registerComponent('mine', () => MineProvider);

export default MineProvider;
