import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity,Dimensions,Image,StatusBar,ScrollView,Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
import { ContentSnippet } from '../helper';
import ViewMoreText from 'react-native-view-more-text';
import Communications from 'react-native-communications';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getLatLng from '../../api/getLatLng';
import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
const sw = W;
const sh = H/3;
const url = "http://192.168.56.1:8080/DACN/images/img_hotel/";
export default class hotelDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      color :'white',
      isActive:false,
      latitude:0,
      longitude:0,
    }
  }
  renderViewMore(onPress){
      return(
        <Text onPress={onPress} style={{fontSize: 20,fontFamily: 'Roboto',color:'blue'}}>Xem thêm</Text>
      )
  }
  renderViewLess(onPress){
      return(
        <Text onPress={onPress} style={{fontSize: 20,fontFamily: 'Roboto',color:'blue'}}>Rút gọn</Text>
      )
  }

  makeCall(){
    Alert.alert(
      'Thông Báo ',
      'Bạn có muốn thực hiện cuộc gọi?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () =>  Communications.phonecall('01626590939', true)},
      ],
      { cancelable: false }
    )

  }

  get gradient () {
      return (
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
      );
  }

  addTourToCart = () => {
    const hotel = this.props.navigation.state.params;
    //this.setState({onPress:true});
    //this.props.navigation.navigate("_SignIn");
    this.setState({isActive: !this.state.isActive})
  }

  componentDidMount(){
    const hotel = this.props.navigation.state.params;
    const adress = hotel.adress;
    getLatLng(adress).then(res => {

      this.setState({
        latitude:  res.results[0].geometry.location.lat,
        longitude:  res.results[0].geometry.location.lng
      })
      //
      this.MovetoCoordinate({
        latitude:  res.results[0].geometry.location.lat,
        longitude:  res.results[0].geometry.location.lng
      })
    });
  }
  MovetoCoordinate(coordinate) {
    this.refs.map.animateToCoordinate(coordinate, 1);
  }
  render(){
    const {isActive} = this.state;
    var st;
    if(isActive==true){
      st = {
        width:30,height:30,marginTop:15,marginLeft:15,marginRight:15,fontSize: 25,height: 25,color :'red'
      };
    }
    else {
      st = {
        width:30,height:30,marginTop:15,marginLeft:15,marginRight:15,fontSize: 25,height: 25,color :'white'
      }
    }
    const hotel = this.props.navigation.state.params;
    return(
      <View style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />
          { this.gradient }

              <ScrollView >
                <View style={{height: sh,flexDirection:'row',justifyContent: 'space-between'}}>
                  <ScrollView style={{height: sh, width: sw,position:'absolute' }}
                    horizontal
                    removeClippedSubviews={false}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustInsets={false}
                    pagingEnabled={true}
                  >
                    {hotel.images.map(function(photo){
                      return(
                        <View style={{height: sh, width: sw}} key={photo}>
                                        <Image source={{ uri: `${url}${photo}` }} style={{width:sw,height: sh}} />
                        </View>
                      )
                    }
                    )}
                  </ScrollView>
                  <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <FontAwesome name='chevron-left' style={{width:30,height:30,marginTop:15,marginLeft:15,marginRight:15,fontSize: 25,height: 25,color :'white'}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.addTourToCart}>
                    <FontAwesome name='heart' style={st} />
                  </TouchableOpacity>
                </View>
                <View >
                  <View style={{marginLeft:10,marginTop:15,marginBottom:15}}>
                    <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black',fontWeight:'bold'}}>
                      Mô tả
                    </Text>
                  </View>
                  <View style ={{marginLeft:20,marginBottom:20,marginRight:5}}>
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                      textStyle={{textAlign:'justify',fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                      <Text>
                        {hotel.descc}
                      </Text>
                    </ViewMoreText>
                  </View>
                </View>
                <View>
                  <View style={{marginLeft:10,marginTop:15,marginBottom:15, flexDirection:'row'}}>
                    <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black',fontWeight:'bold'}}>
                      Giá phòng:
                    </Text>
                    <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black'}}> Từ </Text>
                    <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black'}}>{hotel.cost.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</Text>
                  </View>
                </View>
                <View>
                  <View style={{marginLeft:10,marginTop:15,marginBottom:15}}>
                    <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black',fontWeight:'bold'}}>
                      Liên hệ
                    </Text>
                  </View>
                  <View style ={{marginLeft:20,marginBottom:20,marginRight:5,flexDirection:'row'}}>
                    <FontAwesome name="phone" style={{width:30,height:30,fontSize: 25,height: 25,color :'white'}} />
                    <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => this.makeCall()}>
                        <Text style={{fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                            01626590939
                        </Text>
                      </TouchableOpacity>
                      <Text style={{fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                          - Ms.Trang (Gọi đặt phòng)
                      </Text>
                    </View>
                  </View>
                  <View style ={{marginLeft:20,marginBottom:20,marginRight:5,flexDirection:'row'}}>
                    <FontAwesome name="firefox" style={{width:30,height:30,fontSize: 25,height: 25,color :'white'}} />
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => Communications.web('https://trippy.vn/khach-san')}>
                        <Text style={{marginLeft:5,fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                            Website
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{marginBottom:15}}>
                  <MapView
                        ref='map'
                        style={{top:0,left:0,bottom:0,right:0,width : W,height:H/2}}
                        provider={PROVIDER_GOOGLE}
                        liteMode
                        initialRegion={{
                          latitude : this.state.latitude,
                          longitude : this.state.longitude,
                          latitudeDelta: 0.006866,
                          longitudeDelta:0.002478
                        }}
                    >
                        <MapView.Marker
                            coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude}}
                            title={hotel.name_hotel}
                            description={hotel.adress}
                        />
                  </MapView>
                </View>
              </ScrollView>
      </View>
    )
  }
}
