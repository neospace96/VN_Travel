import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity,Dimensions,Image,StatusBar,ScrollView,Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ViewMoreText from 'react-native-view-more-text';
import { ContentSnippet } from '../helper';
import global from '../../global'
import sendOrder from '../../api/sendOrder';
import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';
import saveCart from '../../api/saveCart';
import getCart from '../../api/getCart';
import Communications from 'react-native-communications';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
const sw = W;
const sh = H/3;
const url = "http://192.168.56.1:8080/DACN/images/img_tour/";
export default class tourDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      color :'white',
      isActive:false,
    };
  }

  gotoDetail(tour) {
      const { navigate } = this.props.navigation;
      navigate('_tourDetail', {tour} );
  }

  addThisTourToCart=()=> {
          const {tour} = this.props.navigation.state.params;
          this.setState({isActive : !this.state.isActive})
          const token =  getToken();
          const kq =  sendOrder(token, tour);
          if (kq === 'THEM_THANH_CONG') {
              console.log('THEM THANH CONG');
          } else {
              console.log('THEM THAT BAI', kq);
          }
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
        {text: 'OK', onPress: () =>  Communications.phonecall('0911380885', true)},
      ],
      { cancelable: false }
    )

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
    const {tour} = this.props.navigation.state.params;
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
              <ScrollView style={{   height: sh, width: sw,position:'absolute'}}
                horizontal
                removeClippedSubviews={false}
                showsHorizontalScrollIndicator={false}
                automaticallyAdjustInsets={false}
                pagingEnabled={true}
              >

                {tour.images.map(function(photo){
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
              <TouchableOpacity onPress={this.addThisTourToCart}>
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
                    {tour.descc}
                  </Text>
                </ViewMoreText>
              </View>
            </View>
            <View>
              <View style={{marginLeft:10,marginTop:15,marginBottom:15}}>
                <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black',fontWeight:'bold'}}>
                  Thông tin
                </Text>
              </View>
              <View style ={{marginLeft:20,marginBottom:20,marginRight:5}}>
                <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={{textAlign:'justify',fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                  <Text>
                    {tour.info}
                  </Text>
                </ViewMoreText>
              </View>
            </View>
            <View>
              <View style={{marginLeft:10,marginTop:15,marginBottom:15, flexDirection:'row'}}>
                <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black',fontWeight:'bold'}}>
                  Giá tour:
                </Text>
                <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black'}}> Từ </Text>
                <Text style={{fontSize: 24,fontFamily: 'Roboto',color:'black'}}>{tour.cost.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</Text>
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
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={() => this.makeCall()}>
                    <Text style={{fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                        0911380885
                    </Text>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 5,fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                      - Mr.Việt (Gọi để đặt tour)
                  </Text>
                </View>
              </View>
              <View style ={{marginLeft:20,marginBottom:20,marginRight:5,flexDirection:'row'}}>
                <FontAwesome name="firefox" style={{width:30,height:30,fontSize: 25,height: 25,color :'white'}} />
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={() => Communications.web('https://trippy.vn/tour')}>
                    <Text style={{marginLeft:5,fontSize: 20,fontFamily: 'Roboto',color:'black'}}>
                        Website
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }
}
