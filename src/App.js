import React, { Component } from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import Tab from './components/Tab';
import SignUp from './components/SignUp';

import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
} from 'react-native';

import {
  Router,
  Scene,
  ActionConst,
} from 'react-native-router-flux';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54}}>
          <Scene key='home' component={Home} title='Home' navigationBarStyle={{backgroundColor:'#99ff33'}}/>
          <Scene key='signup' component={SignUp} title='SignUp' navigationBarStyle={{backgroundColor:'#99ff33'}}/>
          <Scene key='tab' component={Tab} title='' hideBackImage='true' navigationBarStyle={{backgroundColor:'#99ff33'}} />
          <Scene key='chat' component={Chat} renderTitle={this.props.title} navigationBarStyle={{backgroundColor:'#99ff33'}}/>
        </Scene>
      </Router>
    );
  }

}

Chat.propTypes = {
  name: React.PropTypes.string,
}
