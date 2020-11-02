import React from 'react';
import {AppRegistry} from 'react-native';
import About from '~pages/about/page/about';

const AboutProvider = () => {
  return <About />;
};

AppRegistry.registerComponent('about', () => AboutProvider);

export default AboutProvider;
