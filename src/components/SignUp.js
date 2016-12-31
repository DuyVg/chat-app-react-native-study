'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  StyleSheet,
  Navigator,
} from 'react-native';
import {
  Actions,
  ActionConst
} from 'react-native-router-flux'

import Home from './Home';
import firebase from 'firebase';
import Button from '../rest/Button';
import Header from '../rest/Header';
import Backend from '../Backend';
var app = firebase.database();


export default class SignUp extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: '',
      nickname: '',
    };
  }

  signup(){

    this.setState({
      loaded: false,
    });

    Backend.authSignUp(this.state.email, this.state.password,this.state.nickname);

    this.setState({
      email: '',
      password: '',
      nickname: '',
      loaded: true
    });


  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="" loaded={this.state.loaded} />
        <View style={styles.body}>

          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({nickname: text})}
            value={this.state.nickname}
            placeholder={"Tên hiển thị"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Địa chỉ Email"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Mật khẩu"}
          />
          <Button
            text="Đăng Ký"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Bạn đã có tài khoản?"
            onpress={()=>{
              Actions.home({
                type: ActionConst.BACK
              });
            }}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99ff33',
  },
  textinput: {
    width :230,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor:'#ecf0f1',
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: 'black',
    fontSize: 16
  },
  primary_button: {
    margin: 10,
    padding: 10,
    width: 100,
    borderRadius: 5,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 15
  },
  image: {
    width: 100,
    height: 100
  }
})
