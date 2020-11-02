import React from 'react';
import {AppRegistry} from 'react-native';
import Collection from '~pages/collection/page/collection';

const CollectionProvider = () => {
  return <Collection />;
};

AppRegistry.registerComponent('collection', () => CollectionProvider);

export default CollectionProvider;
