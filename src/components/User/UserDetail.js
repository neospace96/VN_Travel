import React, {Component} from 'react';
import {
  View,Text,Image,TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class UserDetail extends Component{
  render(){
    return(
      <View style={{flex:1}}>
        <LinearGradient
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1, y: 1 }}
          colors={['#56C2F0', '#58A6EB', '#5A89E5']}
          locations={[0, 0.4, 1]}
          style={styles.bi}
        />
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <FontAwesome name='chevron-left' style={{width:30,height:30,marginTop:30,marginLeft:15,fontSize: 25,height: 25,color :'white'}} />
        </TouchableOpacity>
        <View style = {{alignItems:'center',marginTop:120}}>
          <Image
            source = {require('../../media/pl.jpg')}
            style = {{width:150, height:150, borderRadius:150}}
          />
        </View>
        <View style={{alignItems:'center',marginTop:20, marginBottom:50}}>
          <Text style={{fontSize:35,color:'rgb(119, 9, 125)', }}>{this.props.navigation.state.params.user.name}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
          <View style={{marginLeft:5}}>
            <Text style={{fontSize:24 ,marginBottom:50,color:'black'}}>Địa chỉ:</Text>
            <Text style={{fontSize:24 ,marginBottom:50,color:'black'}}>Điện thoại:</Text>
          </View>
          <View style={{marginLeft:5}}>
            <Text style={{fontSize:24 ,marginBottom:50}}> {this.props.navigation.state.params.user.address}</Text>
            <Text style={{fontSize:24 ,marginBottom:50}}> {this.props.navigation.state.params.user.phone}</Text>
          </View>
        </View>
      </View>
    )
  }
}
