'use strict'

import React, { Component } from 'react';
import Backend from '../Backend.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  GiftedChat,
} from 'react-native-gifted-chat';

export default class Chat extends React.Component {

  state = {
    massage: [],
    oher: [],
  }

  componentWillMount(){

  }

  render() {
    return (
      <View style={{flex: 1}} >
        <Text style={{}}>  hello {this.props.title}</Text>
        <GiftedChat
           messages={this.state.other}
           onSend={(message)=>{
             Backend.sendMessage(message);
           }}


           user={{
             _id: Backend.getUid(),
             name: this.props.name,
           }}
         />
       </View>
    );
  }

  componentDidMount() {
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          other: GiftedChat.append(previousState.other, message),
        };
      });
    });
  }

  componentWillUnmount() {
    Backend.closeChat();
  }
}
var styles = StyleSheet.create({
  tieude: {
    marginTop: 54,
    marginLeft: 20,
    fontSize:30,
  },
})

Chat.defaultProps = {
  username: ''
}

Chat.propTypes = {
  username: React.PropTypes.string,
}
