import React from 'react';
import {AppRegistry} from 'react-native';
import Day from '~pages/day/page/day';

const DayProvider = () => {
  return <Day />;
};

AppRegistry.registerComponent('day', () => DayProvider);

export default DayProvider;
