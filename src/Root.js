import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity
} from 'react-native';

import {SlideMenu} from './components/route'

export default class Root extends Component{
  render(){
    return(
      <SlideMenu />
    )
  }
}
