'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {

  render(){
    return (
      <View>
        <TouchableOpacity underlayColor={"#E8E8E8"} onPress={this.props.onpress} style={this.props.button_styles}>
          <View>
              <Text style={this.props.button_text_styles}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('Button', () => Button);
