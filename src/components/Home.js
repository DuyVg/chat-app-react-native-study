import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';
import Backend from '../Backend';
import Button from '../rest/Button';
import Header from '../rest/Header';

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  login(){

    this.setState({
      loaded: false
    });

    Backend.authSignIn(this.state.email, this.state.password);

    this.setState({
      loaded: true
    });

  }


  render() {
    return (
      <View style={ styles.manhinh }>
        <Header text="" loaded={this.state.loaded} />
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
          <Image
            style={styles.image}
            source={require('../image/chaticon.png')}
            />
        </View>
        <View style={ styles.manhinhdangnhap}>
          <TextInput
            style={ styles.tendangnhap}
            placeholder='Email sử dụng'
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            maxLength={50}
            multiline={false}
          />
          <TextInput
            style={ styles.tendangnhap}
            placeholder='Mật khẩu'
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            value={this.state.password}
            maxLength={50}
            multiline={false}
          />
          <Button
            text="Đăng Nhập"
            onpress={this.login.bind(this)}
            button_styles={styles.nutdangnhap}
            button_text_styles={styles.tennut} />
          <Button
            text="Chưa có tài khoản?"
            onpress={()=>{
              Actions.signup({
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
  manhinh: {
    flex: 1,
    backgroundColor: '#99ff33',
  },

  manhinhdangnhap: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tendangnhap: {
    marginTop: 10,
    width: 250,
    color: 'black',
    padding: 10,
    height: 41,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: 'white',

  },

  nutdangnhap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'black',
    width: 130,
  },

  tennut: {
    width: 230,
    //flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },

  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: 'black',
    fontSize: 16
  },
  image: {
    width: 150,
    height: 150,
  }
});
