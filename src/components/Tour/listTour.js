import React, { Component } from 'react';
import {
  Text, View,TouchableOpacity,StatusBar,
  Image,Dimensions,ListView,RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../../styles/castyle';
import getListTour from '../../api/getListTour'
import ActionButton from 'react-native-action-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
const url = "http://192.168.56.1:8080/DACN/images/img_tour/";

export default class Tour extends Component{

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listTours: ds,
      refreshing:false,
    };
    this.arr = [];
  }

  componentDidMount(){
    const idCity = this.props.navigation.state.params.id_city;
    getListTour(idCity)
      .then(arrTour=>{
        this.arr = arrTour;
        this.setState({
          listTours:this.state.listTours.cloneWithRows(this.arr)
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
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />
          { this.gradient }
          <View style={styles.header} >
            <TouchableOpacity style={styles.header_Left}
                onPress={()=>{this.props.navigation.goBack()}}
             >
                <Image
                        style = {styles.imgMenu}
                        source={require('../../media/back.png')}
                />
                <Text style={{color:'black',fontSize:H *0.03, fontFamily:'Roboto'}} >{this.props.navigation.state.params.name}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.listTours}
            renderRow={tour => (
              <TouchableOpacity style={styles.card}
                onPress = { () => {this.props.navigation.navigate('_tourDetail', tour)} }
              >
                <Image style={styles.tourImage} source={{ uri: `${url}${tour.images[0]}` }} />
                <View style={{margin:20}}>
                  <Text style={{color:'black',fontSize:20, fontFamily:'Roboto',fontWeight:'bold'}}>{tour.name_tour}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Hotel" textStyle={{fontFamily:'Roboto'}} onPress={() => {this.props.navigation.navigate('_Hotel', {id_city : idCity})}}>
            <FontAwesome name="home" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Tour" textStyle={{fontSize: 15, fontFamily:'Roboto'}} onPress={() => {}}>
            <FontAwesome name="globe" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}
