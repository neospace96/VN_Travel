import { StackNavigator } from 'react-navigation';
import React from 'react';
import Home from './Home/Home';
import Tour from './Tour/listTour';
import tourDetail from './Tour/tourDetail';
import Hotel from './Hotel/listHotel';
import hotelDetail from './Hotel/hotelDetail';

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
