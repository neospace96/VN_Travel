import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions,Image,Alert,Picker,TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;

const mode = 'driving'; //'walking';
const APIKEY = 'AIzaSyBZCDJchLkCxcHupJWZ7YDCWErOlhHfEK8';
//const url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+this.state.origin+'&destination='+destination+'&key='+APIKEY+'&mode='+mode;
//const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=Hồ Chí Minh&destination=Tan+An,+Long+An,+Viet+Nam&key=AIzaSyD9Qs7IPmEYsxCH3mG54GIJj_GUSuyJv-g'

var t;
export default class Restaurant extends Component{
  constructor(props){
    super(props);
     this.state = {
         filter: <View></View>,
        initalRegion:{
                latitude:0,
                longitude:  0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
           },
           coords:'',
           distances:{
               distance:{
                text:'0',
                value:'0'
               },
               duration:{
                text:'0',
                value:'0'
               }
           },
           origin : '',
           destination : '10.839044 ,106.751585',
           makerPosition:{
               latitude:0,
               longitude:0,
           },
           x:{
            latitude:0,
            longitude:0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,

        },
        service:[],
        keyword:'atm',
        address:''
        }
        t= this;
    }
_getService(){
        url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=10.8105831,106.7091422&radius=1000&type='+this.state.keyword+'&keyword='+this.state.keyword+'&key='+APIKEY
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
             if (responseJson.results !=null){
                this.setState({service:responseJson.results})
             }
            console.log(this.state.service)
        })
        .catch(e => {console.warn(e)});
}
 watchID : ?number = null
GPS(){
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initalRegion = {
            latitude: lat,
            longitude: long ,
            latitudeDelta:0.0422,
            longitudeDelta: W/(30*H),
        }
        this.setState({initalRegion:initalRegion});
        this.setState({makerPosition:initalRegion})

        this.setState({origin:+initalRegion.latitude+','+initalRegion.longitude })
    },
        (error) => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta:0.0422,
                longitudeDelta: W/(30*H),
            }
            this.setState({initalRegion: lastRegion})
            this.setState({makerPosition:lastRegion})
            this.setState({origin:+lastRegion.latitude+','+lastRegion.longitude })
            this._getService();
        })

}
_selectedMarker(e){
    this.setState({
        filter:
                        <View style={styles.footer}>
                        <Image
                        source={require('../../media/eye.png')}
/>
                        <Text style={{fontSize:W*0.028}} >{e}</Text>
                    </View>
    })
}
    componentWillMount(){

    }
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
           }


_onPressMap(e){
let  region = {
    latitude:e.nativeEvent.coordinate.latitude,
    longitude:  e.nativeEvent.coordinate.longitude,
    latitudeDelta: 0.0422,
    longitudeDelta: W/(30*H),
}
this.setState({initalRegion:region})
}

componentDidMount(){
  this.GPS();

 }
  render() {
    return (
        <View style={{flex:1}}>
         <MapView
               style={styles.map}
               followUserLocation={true}
               showsUserLocation={true}
               showsCompass={true}
               showsBuildings
               showsTraffic
          //     onRegionChange={this._onPressMap.bind(this)}
               cacheEnabled={true}
               showsScale
               region={this.state.initalRegion}
                style={{flex:1}}
                mapType = "standard"
            >
            {this.state.service.map(function(o,i){
              //  console.log(o.vicinity)
              return(
            <MapView.Marker
                    key = {i}
                    coordinate={{
                          latitude: parseFloat(o.geometry.location.lat),
                          longitude: parseFloat(o.geometry.location.lng),
                    }}
                    title={o.name}
                    description={o.MoTa}
                    image={uri=o.icon}
                    onPress ={()=>{t._selectedMarker(o.vicinity)}}
                    >
            </MapView.Marker>
                        )
                })}
        </MapView>

        <View style={styles.Container} >
            <View style={styles.Distance} >
                <View style={styles.Master}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={styles.DLeft}>
                        <Image
                        style = {styles.imgMenu}
                        source={require('../../media/back.png')}/>
                </TouchableOpacity>
                <View style={styles.DistanceCenter}>
                        <Picker
                        style={{flex:1}}
                        selectedValue={this.state.keyword}
                        onValueChange={(itemValue, itemIndex) => this.setState({keyword: itemValue},function(){this._getService()})}>
                        <Picker.Item label="ATM" value="atm" />
                        <Picker.Item label="Ăn uống" value="food" />
                        <Picker.Item label="Trạm xăng" value="gas_station" />
                        <Picker.Item label="Bệnh viện" value="hospital" />
                        <Picker.Item label="Coffee" value="cafe" />
                        <Picker.Item label="Sở cảnh sát" value="police" />
                        <Picker.Item label="Trạm xe bus" value="bus" />
                    </Picker>
                </View>
                 <View style={styles.DRight}></View>
                </View>
            </View>
            <View style={styles.absContainer}></View>
            {this.state.filter}
            {/* <View style={styles.footer}>
               <Image
               source={require('../images/location.png')}
               />
               <Text style={{fontSize:W*0.028}} >{this.state.address}</Text>
            </View> */}
        </View>
    </View>
    );
  }
}
const styles= StyleSheet.create({
    map:{
        flex:1
    },
    Container:{
         flex:1,
         position: 'absolute',
         //alignItems: 'center'
    //     padding:W*0.05
    },
    Distance:{
       width: W,
        height:H*0.1,
      //  backgroundColor:'green',
      justifyContent:'center'
    },
    absContainer:{height: H*0.7},
    footer:{flexDirection:'row',justifyContent:'flex-start',alignItems:'center' ,height: H*0.08,backgroundColor:'rgba(255,255,255,0.9)',margin:W*0.1,borderRadius:3},
    Master:{
        width: W,
        height:H*0.08,
        flexDirection:'row'
    },
    DLeft:{
        width:W*0.15,
        height:H*0.08,
        justifyContent:'center',
        alignItems:'center'
    },
    imgMenu: {width: W * 0.08, height: W * 0.08},
    DRight:{
        width:W*0.15,
        height:H*0.08,
    },
    DistanceCenter:{
        flexDirection:'row',
        width: W * 0.7,
        height:H*0.08,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:2,
        padding:H*0.015,
        justifyContent:'center',
        alignItems:'center'
    },

    Distance_text:{
        fontSize:W*0.035
    },
    distance_image:{
         flex:1,
         flexDirection:'row',
         borderRightWidth:1,
         borderColor:'rgba(0,0,0,0.2)'
        }
})
