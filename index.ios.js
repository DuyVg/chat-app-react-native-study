
import React, { Component } from 'react';
import App from './src/App.js';
import {
  AppRegistry,

} from 'react-native';

 class ChatApp extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('ChatApp', () => App);
