import React, { Component } from "react";
import {
  View,Alert,Image,
  Text,TextInput,TouchableOpacity
} from "react-native";
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk';
import signIn from "../../api/signIn";
import global from "../../global";
import saveToken from "../../api/saveToken";
import styles, { colors } from '../../styles/castyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardActionSeparator from './CardActionSeparator';
import { setUserInfo } from './UserInfo';

export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state ={
      isFocused:false,
      email: '',
      password: ''
    };
  }
  _fbAuth = () => {
    const {navigation} = this.props;
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          Alert.alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const {accessToken} = data
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
            .then((response) => response.json())
            .then((json) => {
              this.SetUserInfo(json);
              Alert.alert(
                'Thông báo',
                'Đăng nhập thành công fb',
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.navigate("_Home")
                    }
                  }
                ],
                { cancelable: false }
              );
            })
            .catch(() => {
              reject('ERROR GETTING DATA FROM FACEBOOK')
            })
          });
        }
      },
      function(error) {
        Alert.alert('Login fail with error: ' + error);
      }
    );
  }
  async SetUserInfo(input) {
    await setUserInfo(input);
  }
  goSignUp = () => {
    this.props.navigation.navigate("_SignUp");
  }

  onSignIn = () => {
    const { email, password } = this.state;
    signIn(email, password)
      .then(res => {
        saveToken(res.token);
        Alert.alert(
          "Thông báo",
          "Đăng nhập thành công",
          [
            {
              text: "OK",
              onPress: () => {
                {this.SetUserInfo({ name: res.user.name,address:res.user.address,phone:res.user.phone })}
                this.props.navigation.navigate("_Home")
              }
            }
          ],
          { cancelable: false }
        );
      })
      .catch(err => {
        console.log(err);
        this.Fail("Kiểm tra lại thông tin đăng nhập");
      });
  }

  Fail = (notification) => {
    Alert.alert("Thông báo", notification, [{ text: "OK" }], {
      cancelable: false
    });
  }

  deletebtn = () => {
    if(!this.state.email || this.state.email === ''){
      return null
    }
    return(
      <TouchableOpacity
        style={styles.dvb}
        onPress = {this.deletevalue}
      >
        <FontAwesome
          name="times-circle"
          color="#BDBDBD"
          size={25}
        />
      </TouchableOpacity>
    )
  }

  deletevalue = () => {
    this.setState({email:''})
  }

  deletebtnn = () => {
    if(!this.state.password || this.state.password === ''){
      return null
    }
    return(
      <TouchableOpacity
        style={styles.dvb}
        onPress = {this.deletevaluee}
      >
        <FontAwesome
          name="times-circle"
          color="#BDBDBD"
          size={25}
        />
      </TouchableOpacity>
    )
  }

  deletevaluee = () => {
    this.setState({password:''})
  }

  focus = () => {
    this.setState({isFocused : true})
  }

  blur = () =>{
    this.setState({isFocused :false})
  }

  render() {
    const ipcs =[styles.ipc];
    if(this.state.isFocused){
      ipcs.push({borderBottomColor:'#009B3A'})
    }
    const {email,password} = this.state;

    return(
      <View style={{flex:1,alignItems:'center',justifyContent: 'flex-end'}}>
        <LinearGradient
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1, y: 1 }}
          colors={['#56C2F0', '#58A6EB', '#5A89E5']}
          locations={[0, 0.4, 1]}
          style={styles.bi}
        />
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              height: 100,
              width: 100
            }}
          >
            <Image source={require("../../media/logo.png")} />
          </View>
          <View style={styles.cas}>
            <View style={styles.cac}>
              <View style={styles.iwrt}>
                <View style={ipcs}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    onFocus={this.focus}
                    onBlur={this.blur}
                    value={email}
                    onChangeText={text => this.setState({email:text})}
                  />
                  {this.deletebtn()}
                </View>
              </View>
              <View style={styles.iwrt}>
                <View style={ipcs}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry
                    onFocus={this.focus}
                    onBlur={this.blur}
                    value={password}
                    onChangeText={text => this.setState({password:text})}

                  />
                  {this.deletebtnn()}
                </View>
              </View>
              <TouchableOpacity
                onPress = {this.onSignIn}
                style={styles.bc}
              >
                <LinearGradient
                  start = {{x:0.0,y:1.0}}
                  end={{x:1,y:0}}
                  colors={['#069556','#00756D','#005C82']}
                  locations={[0.2,0.5,1]}
                  style={styles.btn}
                >
                <Text style={{fontSize:20,color:'#FFF'}}>Đăng nhập</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.caa}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress = {this.goSignUp}
              >
                <Ionicons
                  style={styles.actionIcon}
                  name="ios-person-add-outline"
                  color="white"
                  size={40}
                />
              </TouchableOpacity>
              <CardActionSeparator color="white" height={20}/>
              <TouchableOpacity
                style={styles.actionButton}
                onPress = {this._fbAuth}
              >
                <Ionicons
                  style={styles.actionIcon}
                  name="logo-facebook"
                  color="white"
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>

      </View>
    );
  }
}
