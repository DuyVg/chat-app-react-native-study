'use strict'

import React, { Component } from 'react';
import Backend from '../Backend.js';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  AppState,
} from 'react-native';

import firebase from 'firebase';
import CustomActions from '../rest/CustomActions'
import {
  GiftedChat,
  Actions,
} from 'react-native-gifted-chat';

export default class GroupChat extends React.Component {

  constructor(props){
    super(props);
    this.database = firebase.database();
    var user = firebase.auth().currentUser;
    this.state = {
      message: [],
      other: [],
      userOnline: 0,
      photoUrl: user.photoURL,
    };
    this.userOnlineRef = this.database.ref('userOnline');
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange() {
    console.log('AppState',AppState.currentState);
    if (AppState.currentState == 'active') {
      this.getNumberOfUserOnlineOnceAndIncreaseBy1();
    } else if (AppState.currentState == 'inactive' || AppState.currentState == 'background') {
      this.decreaseNumberOfUserOnline();
    }
  }

  getNumberOfUserOnlineOnceAndIncreaseBy1() {
    this.userOnlineRef.once('value', (snapshot) => {
      this.userOnlineRef.set(snapshot.val()+1);
    })
  }

  decreaseNumberOfUserOnline() {
    this.userOnlineRef.once('value', (snapshot) => {
      this.userOnlineRef.set(snapshot.val()-1);
    })
  }

  listeningForNumberOfUserOnline() {
    this.userOnlineRef.on('value', (snapshot) => {
      console.log('UserOnline change', snapshot.val());
      this.setState({userOnline:snapshot.val()});
    });
  }

  renderCustomActions(props) {
    return (
      <CustomActions
        {...props}
      />
    );
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  componentWillMount(){

  }

  render() {
    return (
      <View style={{flex: 1}} >
        <Text style={styles.useronline}>#Số người online: {this.state.userOnline} {this.props.title}</Text>
        <GiftedChat
           messages={this.state.other}
           onSend={(message)=>{
             Backend.sendMessage(message);
           }}


           user={{
             _id: Backend.getUid(),
             name: this.props.name,
           }}

           renderActions={this.renderCustomActions}
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
    this.listeningForNumberOfUserOnline();
    this.getNumberOfUserOnlineOnceAndIncreaseBy1();
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
  useronline: {
    fontSize: 15,
    fontWeight:'bold',
    color: 'black',

  }
})

GroupChat.propTypes = {
  name: React.PropTypes.string,
}
