import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image,
  AppState,
  Alert,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';
import Backend from '../Backend';
import firebase from 'firebase';
import Button from '../rest/Button';
import GroupChat from './GroupChat';

export default class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentWillMount() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      console.log(name)   ;
      this.setState({
        user: user,
        name: user.displayName,
        photoUrl: user.photoURL,
      })
    }
  }

  render(){

    return (
      <View style={styles.container}>
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <Image
                style={styles.image}
                source={{uri: this.state.photoUrl}}
              />
              <View style={styles.email_container}>
                <Text style={styles.email_text}>Tên: {this.state.name}</Text>
              </View>
              <View style={styles.email_container}>
                <Text style={styles.email_text}>Email: {this.state.user.email}</Text>
              </View>

              <Button
                text="Đăng xuất"
                onpress={this.logout.bind(this)}
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View>
      </View>
    );
  }

  componentDidMount() {
  }

  logout(){
    Backend.authSignOut();
  }

  updateUser(){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: 'VDUY',
      photoURL: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png'
    }).then(() => {
      // Update successful.
      Alert.alert('Thông báo','Cập nhật thành công');
      this.setState({
        name: user.displayName,
        photoUrl: user.photoURL,
      });
    }, function(error) {
      // An error happened.
    });
  }

}

var styles = StyleSheet.create({
  email_container: {
    padding: 20,

  },
  email_text: {
    fontSize: 18
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 9,
    justifyContent: 'flex-start',
  },
  textinput: {
    width :230,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor:'#ecf0f1',
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#ecf0f1',
    fontSize: 16
  },
  primary_button: {
    margin: 10,
    padding: 15,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 10,
    marginLeft:10,
  },
});
