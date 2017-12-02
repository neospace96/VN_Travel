import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity
} from 'react-native';

import {HomeStack} from './components/route'

export default class Root extends Component{
  render(){
    return(
      <HomeStack />
    )
  }
}
