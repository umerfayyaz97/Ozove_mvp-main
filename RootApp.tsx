import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/Redux/Store/Store';
import App from './App';

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
