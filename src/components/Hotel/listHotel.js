import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity,StatusBar,
  Image,Dimensions,ListView,RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
import getListHotel from '../../api/getListHotel';
import ActionButton from 'react-native-action-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
const url = "http://192.168.56.1:8080/DACN/images/img_hotel/";

export default class Hotel extends Component{

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listHotels: ds,
      refreshing:false,
    };
    this.arr = [];
  }

  componentDidMount(){
    const idCity = this.props.navigation.state.params.id_city;
    getListHotel(idCity)
      .then(arrHotel=>{
        this.arr = arrHotel;
        this.setState({
          listHotels:this.state.listHotels.cloneWithRows(this.arr)
        });
      })
      .catch((error)=>{console.error(error)});
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

  render(){
    const idCity = this.props.navigation.state.params.id_city;
    return(
      <View style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />
          { this.gradient }

        <View style={styles.center}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.HLeft}
              onPress={()=>{
                this.props.navigation.navigate('DrawerOpen');
              }}
            >
              <SimpleLineIcons name="menu" style={{fontSize: 30,height: 30,color:'white'}}/>
            </TouchableOpacity>
            <Text style={styles.title}>{this.props.navigation.state.params.name}</Text>
          </View>
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.listHotels}
            renderRow={hotel => (
              <TouchableOpacity style={styles.card}
                onPress = { () => {this.props.navigation.navigate('_hotelDetail', hotel)} }
              >
                <Image style={styles.tourImage} source={{ uri: `${url}${hotel.images[0]}` }} />
                <View style={{margin:20}}>
                  <Text style={{color:'black',fontSize:20, fontFamily:'Roboto',fontWeight:'bold'}}>{hotel.name_hotel}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Hotel" textStyle={{fontSize: 15, fontFamily:'Roboto'}} onPress={() => console.log("notes tapped!")}>
            <FontAwesome name="home" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Tour" textStyle={{fontSize: 15, fontFamily:'Roboto'}} onPress={() => {this.props.navigation.navigate('_Tour', {id_city : idCity,name: this.props.navigation.state.params.name})}}>
            <FontAwesome name="globe" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}
