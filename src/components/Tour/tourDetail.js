import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity,Dimensions,Image,StatusBar,ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
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
          <View>
            <ScrollView style={{   height: sh, width: sw }}
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
        </View>
      </View>
    )
  }
}
