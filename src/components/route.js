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
import SignIn from './User/SignIn'
import SignUp from './User/SignUp'
import Menu from './Menu/Menu';
import wlView from './WishList/wlView'
import UserDetail from './User/UserDetail'

const AppStack = StackNavigator({
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
  _SignIn:{
    screen: SignIn,
    navigationOptions:{
      header:null
    }
  },
  _SignUp:{
    screen: SignUp,
    navigationOptions:{
      header:null
    }
  },
  _Profile:{
    screen: UserDetail,
    navigationOptions:{
      header:null
    }
  },
  _Cart:{
    screen:wlView,
    navigationOptions:{
      header:null
    }
  }
})
export const SlideMenu = DrawerNavigator({
  Home:{
    screen: AppStack,
    navigationOptions:{
      header:null
    }
  }
},{
    drawerWidth: W*0.7,
    drawerPosition: 'left',
    contentComponent: (props) => {
      return <Menu {...props}/>
    },
    drawerBackgroundColor: 'transparent'
})
export const HomeStack = StackNavigator({
  _SignIn:{
    screen: SignIn,
    navigationOptions:{
      header:null
    }
  },
  HomeScreen: {
    screen: SlideMenu,
    navigationOptions:{
      header:null
    }
  },
})
