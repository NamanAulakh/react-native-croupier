import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';
import Root from './src';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
}
