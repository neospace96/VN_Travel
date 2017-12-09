import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React from 'react';
import { Dimensions } from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import Home from './Home/Home';
import Tour from './Tour/listTour';
import tourDetail from './Tour/tourDetail';
import Hotel from './Hotel/listHotel';
import hotelDetail from './Hotel/hotelDetail';
import Menu from './Menu/Menu';
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
  _Hotel:{
    screen: Hotel,
    navigationOptions:{
      header:null
    }
  },
  _hotelDetail:{
    screen: hotelDetail,
    navigationOptions:{
      header:null
    }
  },
})
export const SlideMenu = DrawerNavigator({
    _Slide: {
        screen: HomeStack
    }
},{
    drawerWidth: W*0.7,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />,
    drawerBackgroundColor: 'transparent'
})
