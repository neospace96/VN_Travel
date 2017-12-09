import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity,Dimensions,Image,StatusBar,ScrollView,ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
import HeaderImageScrollView,{TriggeringView} from 'react-native-image-header-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ViewMoreText from 'react-native-view-more-text';
import { ContentSnippet } from '../helper'
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
const sw = W;
const sh = H/3;
const url = "http://192.168.56.1:8080/DACN/images/img_tour/";
export default class tourDetail extends Component{

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

  render(){
    const tour = this.props.navigation.state.params;
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
                    <View>
                      <View style={{height: sh, width: sw}} key={photo}>
                                      <Image source={{ uri: `${url}${photo}` }} style={{width:sw,height: sh}} />
                      </View>
                    </View>
                  )
                }
                )}
              </ScrollView>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                <FontAwesome name='chevron-left' style={{width:30,height:30,marginTop:15,marginLeft:15,marginRight:15,fontSize: 25,height: 25,color: 'white'}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{}}>
                <FontAwesome name='heart' style={{width:30,height:30,marginTop:15,marginLeft:15,marginRight:15,fontSize: 25,height: 25,color: 'white'}} />
              </TouchableOpacity>
            </View>
            <View>
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
        </ScrollView>
      </View>
    )
  }
}
