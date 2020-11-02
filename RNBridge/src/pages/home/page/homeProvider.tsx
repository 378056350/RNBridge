import React from 'react';
import {AppRegistry} from 'react-native';
import {StoreContext} from 'redux-react-hook';
import store from '~pages/home/store';
import Home from '~pages/home/page/home';

const HomeProvider = (props) => {
  return (
    <StoreContext.Provider value={store}>
      <Home {...props}/>
    </StoreContext.Provider>
  );
};



AppRegistry.registerComponent('home', () => HomeProvider);

export default HomeProvider;
