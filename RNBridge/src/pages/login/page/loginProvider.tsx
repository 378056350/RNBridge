import React from 'react';
import {AppRegistry} from 'react-native';
import {StoreContext} from 'redux-react-hook';
import Login from '~pages/login/page/login';
import store from '~pages/login/store';

const LoginProvider = (props) => {
  return (
    <StoreContext.Provider value={store}>
      <Login {...props} />
    </StoreContext.Provider>
  );
};

AppRegistry.registerComponent('login', () => LoginProvider);

export default LoginProvider;
