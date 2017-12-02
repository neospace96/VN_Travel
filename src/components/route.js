import { StackNavigator } from 'react-navigation';
import React from 'react';
import Home from './Home/Home';
import Tour from './Tour/listTour';
import tourDetail from './Tour/tourDetail';

export const HomeStack = StackNavigator({
  _Home:{
    screen: Home,
    navigationOptions:{
      header:null
    }
  },
  _Tour:{
    screen: Tour,
    navigationOptions:{
      header:null
    }
  },
  _tourDetail:{
    screen: tourDetail,
    navigationOptions:{
      header:null
    }
  },
})
