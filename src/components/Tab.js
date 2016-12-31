import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Info from './Info'
import GroupChat from './GroupChat'
import ListChat from './ListChat'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Tab extends Component {
  render() {
    return (
      <View style={{ flex:1 }}>
        <View style ={styles.topBit}>
          <Text style={styles.logo}>ChatApp</Text>
          <View>
            <Text style={styles.name}>Xin chào {this.props.name}</Text>
          </View>
        </View>
        <ScrollableTabView
          tabBarUnderlineColor="red"
          tabBarBackgroundColor ='#99ff33'
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#88b0ac"
        >
          <Info tabLabel="Thông tin" />
          <GroupChat tabLabel="Chat nhóm tự do" {...this.props}/>
          <ListChat tabLabel="Danh sách" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0ffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo:{
    color:'black',
    fontSize:20,
    margin:5,
    marginLeft:20,
    fontWeight:'500',
  },
  name:{
    fontSize: 15,
    color: 'black',
    marginRight: 10,
  },
  topBit:{
    flexDirection:'row',
    alignItems:'center',
    paddingTop:5,
    backgroundColor:'#99ff33',
    justifyContent:'space-between'
  },
});
