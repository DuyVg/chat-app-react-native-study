'use strict'

import firebase from 'firebase';
import {
  Alert,
  AsyncStorage
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

class Backend {
  uid = '';
  messagesRef = null;

  //khoi tao Firebase Backend
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAc5-lfIhY2rg-ST14NvlG8PoFy8Sx7SLk',
      authDomain: 'chatapp-6b484.firebaseapp.com',
      databaseURL: 'https://chatapp-6b484.firebaseio.com',
      storageBucket: 'chatapp-6b484.appspot.com',
      messagingSenderId: '6669066653'
    });
    var database = firebase.database();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
        console.log(user);
      } else {

        };
      }
    );

  }

  authSignUp(email, password, nickname) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      Alert.alert('Thông báo','Bạn đã đăng ký thành công.');
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: 'VDUY',
      })
    },function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
        switch(errorCode){

          case 'auth/email-already-in-use':
            Alert.alert('Thông báo','Email đã được sử dụng.');
          break;

          case 'auth/invalid-email':
            Alert.alert('Thông báo','Email không hợp lệ.');
          break;

          default:
            alert(errorMessage);
        }
      // ...
    });
  }

  authSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      //Alert.alert('Thong bao','Ban da dang nhap thanh cong.');
      Actions.tab({
        name: email
      });
    },function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      switch(errorCode){

        case 'auth/user-not-found':
          Alert.alert('Thông báo','Email chưa được đăng ký.');
        break;

        case 'auth/invalid-email':
          Alert.alert('Thông báo','Email không hợp lệ');
        break;

        case 'auth/wrong-password':
          Alert.alert('Thông báo','Sai mật khẩu');
        break;

        default:
          alert(errorMessage)
        }
      // ...
      console.log(error);
    });
  }

  authSignOut() {
    firebase.auth().signOut().then(function() {
      Alert.alert('Thông báo','Bạn đã đăng xuất thành công.');
      Actions.home({
      });
    }, function(error) {
      // An error happened.
    });
  }


  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }


  // nhan messages tu Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('other');
    this.messagesRef.off();
    var onReceive = (data) => {
      var message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // gui message toi Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // dong ket noi voi Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
