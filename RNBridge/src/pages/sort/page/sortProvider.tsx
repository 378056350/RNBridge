import React from 'react';
import {AppRegistry} from 'react-native';
import Sort from '~pages/sort/page/sort';

const SortProvider = () => {
  return <Sort />;
};

AppRegistry.registerComponent('sort', () => SortProvider);

export default SortProvider;
