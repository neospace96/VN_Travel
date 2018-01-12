import React, {Component} from 'react';
import {
  View,Text,ScrollView,StyleSheet,Image,ListView
} from 'react-native'
import getIcon from '../helper'
import getLatLng from '../../api/getLatLng';
export default class Weather extends Component{

  constructor(props){
    super(props);
    this.state = {
      nd: '',
      hum:'',
      uv:'',
      tn:'',
      ds:'',
      as:'',
      icon: '',
      time: '',
      daily: [],
      latitude: 0,
      longitude: 0
    }
  }

  componentDidMount(){
    const adress = this.props.navigation.state.params.name;
    getLatLng(adress).then(res => {
      this.setState({
        latitude:  res.results[0].geometry.location.lat,
        longitude:  res.results[0].geometry.location.lng
      })
      fetch('https://api.darksky.net/forecast/f7c6512c1e8b4a09d62e1010b9d60a3c/'+this.state.latitude+','+this.state.longitude+'?units=auto')
      .then((response) => response.json())
      .then((responseJson) =>{
        this.setState({
          nd: (Math.round(responseJson.currently.apparentTemperature)) + "°C",
          hum:  Math.round(100 * responseJson.currently.humidity) + "%",
          uv: responseJson.currently.uvIndex,
          tn: responseJson.currently.visibility + " km",
          ds: (Math.round(responseJson.currently.dewPoint)) + "°C",
          as: (Math.round(responseJson.currently.pressure)) + "mb",
          icon: responseJson.currently.icon,
          time : responseJson.currently.time,
          daily :responseJson.daily.data
        })
      })
    })
  }

  render(){
    const icons = {
        'partly-cloudy-day': require('../../media/partly-cloudy-day.png'),
        'partly-cloudy-night': require('../../media/partly-cloudy-night.png'),
        'clear-day': require('../../media/clear-day.png'),
        'clear-night': require('../../media/clear-night.png'),
        'rain': require('../../media/rain.png'),
        'snow': require('../../media/snow.png'),
        'sleet': require('../../media/sleet.png'),
        'wind': require('../../media/wind.png'),
        'fog': require('../../media/fog.png'),
        'cloudy': require('../../media/cloudy.png'),
        'hail': require('../../media/hail.png'),
        'thunderstorm': require('../../media/thunderstorm.png'),
        'tornado': require('../../media/tornado.png'),
        'meteor-shower': require('../../media/meteor-shower.png'),
        'default': require('../../media/default.png')
    }

    function getIcon(icon){
         return icons[icon];
    }
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const daily = this.state.daily;
    return(
      <ScrollView style ={{backgroundColor:'rgb(27, 26, 25)'}}>
        <View style = {{marginTop:50,marginLeft:15,marginBottom:15}}>
          <Text style = {{fontSize:50,color:'white'}}>{this.state.nd}</Text>
        </View>
        <View style = {{marginLeft:45}}>
          <Text style = {{fontSize:18,color:'white'}}>{this.props.navigation.state.params.name}</Text>
        </View>
        <View style = {{marginTop:50,marginLeft:15,marginBottom:20}}>
          <Text style = {{fontSize:23,color:'white'}}>Chi tiết</Text>
        </View>
        <View style = {{flex:1, justifyContent: 'center',alignItems:'center'}}>
          <View style = {{flexDirection:'row',margin:5}}>
            <View style = {{height:120,width:120,justifyContent:'space-around',alignItems:'center',borderWidth:1,borderColor:'rgb(62, 65, 63)',backgroundColor:'rgb(80, 79, 78)',margin:5}}>
              <Image style={{height:50,width:50}} source={require('../../media/temp.png')}  />
              <Text style={{fontSize:15,color:'white'}}>Nhiệt độ</Text>
              <Text style={{fontSize:20,color:'white'}}>{this.state.nd}</Text>
            </View>
            <View style = {{height:120,width:120,justifyContent:'space-around', alignItems:'center',borderWidth:1,borderColor:'rgb(62, 65, 63)',backgroundColor:'rgb(80, 79, 78)',margin:5}}>
              <Image style={{height:50,width:50}} source={require('../../media/humi.png')}  />
              <Text style={{fontSize:15,color:'white'}}>Độ Ẩm</Text>
              <Text style={{fontSize:20,color:'white'}}>{this.state.hum}</Text>
            </View>
            <View style = {{height:120,width:120,justifyContent:'space-around', alignItems:'center',borderWidth:1,borderColor:'rgb(62, 65, 63)',backgroundColor:'rgb(80, 79, 78)',margin:5}}>
              <Image style={{height:50,width:50}} source={require('../../media/uv.png')}  />
              <Text style={{fontSize:15,color:'white'}}>Chỉ số UV</Text>
              <Text style={{fontSize:20,color:'white'}}>{this.state.uv}</Text>
            </View>
          </View>
          <View style = {{flexDirection:'row',margin:5}}>
            <View style = {{height:120,width:120,justifyContent:'space-around',alignItems:'center',borderWidth:1,borderColor:'rgb(62, 65, 63)',backgroundColor:'rgb(80, 79, 78)',margin:5}}>
              <Image style={{height:50,width:50}} source={require('../../media/eye.png')}  />
              <Text style={{fontSize:15,color:'white'}}>Tầm nhìn</Text>
              <Text style={{fontSize:20,color:'white'}}>{this.state.tn}</Text>
            </View>
            <View></View>
            <View style = {{height:120,width:120,justifyContent:'space-around', alignItems:'center',borderWidth:1,borderColor:'rgb(62, 65, 63)',backgroundColor:'rgb(80, 79, 78)',margin:5}}>
              <Image style={{height:50,width:50}} source={require('../../media/dewpoint.png')}  />
              <Text style={{fontSize:15,color:'white'}}>Điểm sương</Text>
              <Text style={{fontSize:20,color:'white'}}>{this.state.ds}</Text>
            </View>
            <View style = {{height:120,width:120,justifyContent:'space-around', alignItems:'center',borderWidth:1,borderColor:'rgb(62, 65, 63)',backgroundColor:'rgb(80, 79, 78)',margin:5}}>
              <Image style={{height:50,width:50}} source={require('../../media/pressure.png')}  />
              <Text style={{fontSize:15,color:'white'}}>Áp suất</Text>
              <Text style={{fontSize:20,color:'white'}}>{this.state.as}</Text>
            </View>
          </View>
        </View>
        <View style = {{marginTop:50,marginLeft:15,marginBottom:20}}>
          <Text style = {{fontSize:23,color:'white'}}>7 ngày tiếp theo</Text>
        </View>
        <ScrollView horizontal style={{height:150,marginTop:20,marginRight : 20}}>
          {daily.map((obj,i) => {
            const temp = (Math.round(obj.apparentTemperatureMax)) + "°C";
            const iconn = obj.icon;
            const time = obj.time;
            var d = new Date(time*1000);
            return(
                <View key={i} style={{flexDirection : 'column', marginLeft:20, alignItems:'center'}}>
                  <Text style={{fontSize: 15,color:'white'}}>{days[d.getDay()]}</Text>
                  <Text style={{fontSize: 20,color:'white'}}>{temp}</Text>
                  <Image source={getIcon(iconn)}></Image>
                </View>
            )
          })}
        </ScrollView>
        <View style={{flex:1}}></View>
      </ScrollView>
    )
  }
}
