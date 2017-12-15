/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { HomeStack } from './src/components/route'
import global from './src/global'
export default class App extends Component{
  render() {
    return (
      <HomeStack />
    );
  }
}
