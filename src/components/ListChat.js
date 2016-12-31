import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  ListView,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

var DATA =[
  {title:'duy',text:'test 1'},
  {title:'dinh',text:'test 2'},
  {title:'vduy',text:'test 3'},
  {title:'vduy',text:'test 3'},
  {title:'vduy',text:'test 3'},
  {title:'vduy',text:'test 3'},
  {title:'vduy',text:'test 3'},

]
var data = firebase.database();

export default class Chats extends Component {
  constructor(props){
    super(props)
    this.database = firebase.database();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(DATA),
      title: '',
      user: [],
    }
  }



  makeRow(property) {
    return(
      <View>
        <TouchableOpacity style={{flex: 1}}
          onPress={()=>{
            Actions.chat({
              title:property.title,
            });
          }}
        >
        <View>
            <View style={{padding:10}}>
              <Text style = {{fontWeight:'bold',color:'black'}}>{property.title}</Text>
              <Text style = {{paddingTop:3}}>{property.text}</Text>
            </View>
            <View style={{height: 1,backgroundColor:'#95a5a6'}}>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{ paddingTop:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.makeRow}
        />
      </View>
    );
  }

  componentDidMount() {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
