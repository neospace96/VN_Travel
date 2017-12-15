import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity
, FlatList} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import styles, { colors } from '../../styles/castyle';;
import { getUserInfo } from '../User/UserInfo';
export default class Menu extends Component {
  state = {
    user: {
      name:'',
      address:'',
      phone: ''
    }
  }
  componentDidMount() {
    this.setState({ user: getUserInfo() });
  }

  gotoUD = () => {
    this.props.navigation.navigate('_Profile',{user:this.state.user});
  }

  gotoCV = () => {
    this.props.navigation.navigate('_Cart');
  }

  render() {
    return (
      <View style={styles.wrapper}>
          <View style={{height:H*0.3,backgroundColor:'lightblue',justifyContent:'center',alignItems:'center'}}>
            <View style = {{marginBottom:10}}>
              <Image
                source = {require('../../media/pl.jpg')}
                style = {{width:100, height:100, borderRadius:100}}
              />
            </View>
            <Text style={{fontFamily:'Roboto',fontSize:25}}>{this.state.user.name}</Text>
          </View>
          <View style={{flex:1,backgroundColor:'whitesmoke'}}>
            <TouchableOpacity
              style = {{alignItems:'center',height:48, backgroundColor:'white',flexDirection:'row',marginBottom:5}}
              onPress = {this.gotoUD}
            >
              <View style ={{marginLeft:15}}>
                <FontAwesome name="user-o" size={25} color="black"/>
              </View>
              <View style ={{marginLeft:15}}>
                <Text style = {{fontSize:20,fontFamily:'Roboto'}}>Tài khoản</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style = {{alignItems:'center',height:48, backgroundColor:'white',flexDirection:'row',marginBottom:5}}
              onPress = {this.gotoCV}
            >
              <View style ={{marginLeft:15}}>
                <FontAwesome name="heart-o" size={25} color="black"/>
              </View>
              <View style ={{marginLeft:15}}>
                <Text style = {{fontSize:20,fontFamily:'Roboto'}}>Yêu thích</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style = {{alignItems:'center',height:48, backgroundColor:'white',flexDirection:'row',marginBottom:5}}>
              <View style ={{marginLeft:15}}>
                <Feather name="settings" size={25} color="black"/>
              </View>
              <View style ={{marginLeft:15}}>
                <Text style = {{fontSize:20,fontFamily:'Roboto'}}>Cài đặt</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style = {{alignItems:'center',height:48, backgroundColor:'white',flexDirection:'row',marginBottom:5}}>
              <View style ={{marginLeft:15}}>
                <Feather name="help-circle" size={25} color="black"/>
              </View>
              <View style ={{marginLeft:15}}>
                <Text style = {{fontSize:20,fontFamily:'Roboto'}}>Trợ giúp</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}
