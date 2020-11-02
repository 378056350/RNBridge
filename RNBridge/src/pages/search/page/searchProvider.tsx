import React from 'react';
import {AppRegistry} from 'react-native';
import Search from '~pages/search/page/search';

const SearchProvider = () => {
  return <Search />;
};

AppRegistry.registerComponent('search', () => SearchProvider);

export default SearchProvider;
