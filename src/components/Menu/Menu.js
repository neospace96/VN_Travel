import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Dimensions,Image,Picker,TouchableOpacity
, FlatList} from 'react-native';
var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles, { colors } from '../../styles/castyle';;
export default class Menu extends Component {
  constructor(props){
    super(props);
     this.state = {

        };
  }
  render() {
    return (
      <View style={styles.wrapper}>
          <View style={{height:H*0.3,backgroundColor:'lightblue',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'black'}}>VN TRAVEL</Text>
          </View>
          <View style={styles.containerr}>

            <View style={styles.itemsMenu}>
                  <View style={styles.itemsCenter}>
                    <View style={styles.txtMenu}>
                      {/* -------------------LOGIN FB-------------------------- */}
                      <LoginButton
                            style={styles.btnFB}
                            publishPermissions={["publish_actions"]}
                            onLoginFinished={
                              (error, result) => {
                                if (error) {
                                  {/* alert("login has error: " + result.error); */}
                                } else if (result.isCancelled) {
                                  {/* alert("login is cancelled."); */}
                                } else {
                                  AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                      let accessToken = data.accessToken;
                                      {/* alert(accessToken.toString()); */}
                                        console.log(accessToken.toString())
                                      const responseInfoCallback = (error, result) => {
                                        if (error) {
                                          console.log(error)

                                        } else {
                                          console.log(result)

                                        }
                                      }

                                      const infoRequest = new GraphRequest(
                                        '/me',
                                        {
                                          accessToken: accessToken,
                                          parameters: {
                                            fields: {
                                              string: 'email,name,first_name,middle_name,last_name,birthday,mobile_phone'
                                            }
                                          }
                                        },
                                        responseInfoCallback
                                      );
                                      console.log('++++++++++',infoRequest)
                                      // Start the graph request.
                                      new GraphRequestManager().addRequest(infoRequest).start();

                                    })
                                }
                              }
                            }
                      onLogoutFinished={() => alert("logout.")}/>
                    </View>
                  </View>
            </View>
          </View>
      </View>
    );
  }
}
