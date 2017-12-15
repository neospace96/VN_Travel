import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import register from "../../api/register";
import styles, { colors } from '../../styles/castyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      isFocused:false
    };
  }

  Success() {
    Alert.alert(
      "Thông báo",
      "Đăng ký thành công",
      [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("_SignIn")
        }
      ],
      { cancelable: false }
    );
  }

  Fail(notification) {
    Alert.alert(
      "Thông báo",
      notification,
      [{ text: "OK", onPress: () => this.removeEmail() }],
      { cancelable: false }
    );
  }

  removeEmail() {
    this.setState({ email: "" });
  }

  registerUser = () => {
    const {  name, email, password} = this.state;
    register(email, name, password).then(res => {
      if (res === "THANH_CONG") return this.Success();
      else if (res === "KHONG_THANH_CONGG") return this.Fail("Không được để trống");
      this.Fail("Email đã được sử dụng");
    });
  }

  focus = () => {
    this.setState({isFocused : true})
  }
  blur = () =>{
    this.setState({isFocused :false})
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

  deletebtnnn = () => {
    if(!this.state.name || this.state.name === ''){
      return null
    }
    return(
      <TouchableOpacity
        style={styles.dvb}
        onPress = {this.deletevalueee}
      >
        <FontAwesome
          name="times-circle"
          color="#BDBDBD"
          size={25}
        />
      </TouchableOpacity>
    )
  }

  deletevalueee = () => {
    this.setState({name:''})
  }

  render() {
    const sipcs =[styles.sipc];
    if(this.state.isFocused){
      sipcs.push({borderBottomColor:'#009B3A'})
    }
    const {email, name, password} = this.state;
    return (
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
          <View style={styles.sc}>
          <View style={styles.fc} />
            <View style={styles.scac}>
              <View style={styles.cat} >
                <Text style={{fontSize: 25,fontWeight: 'bold',color: '#000000',fontFamily:'Roboto'}} >
                  Đăng ký
                </Text>
              </View>
              <View style={styles.cct}>
                <View style={sipcs}>
                  <TextInput
                    placeholderTextColor="#86919D"
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    placeholder="Họ tên"
                    onFocus={this.focus}
                    onBlur={this.blur}
                    value={name}
                    onChangeText={text => this.setState({name:text})}
                  />
                  {this.deletebtnnn()}
                </View>
              </View>
              <View style={styles.cct}>
                <View style={sipcs}>
                  <TextInput
                    placeholderTextColor="#86919D"
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    placeholder="Email"
                    onFocus={this.focus}
                    onBlur={this.blur}
                    value={email}
                    onChangeText={text => this.setState({email:text})}
                  />
                  {this.deletebtn()}
                </View>
              </View>
              <View style={styles.cct}>
                <View style={sipcs}>
                  <TextInput
                    placeholderTextColor="#86919D"
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    placeholder="Password"
                    onFocus={this.focus}
                    onBlur={this.blur}
                    value={password}
                    secureTextEntry
                    onChangeText={text => this.setState({password:text})}
                  />
                  {this.deletebtnn()}
                </View>
              </View>
              <TouchableOpacity
                onPress = {this.registerUser}
                style={styles.bc}
              >
                <LinearGradient
                  start = {{x:0.0,y:1.0}}
                  end={{x:1,y:0}}
                  colors={['#069556','#00756D','#005C82']}
                  locations={[0.2,0.5,1]}
                  style={styles.btn}
                >
                <Text style={{fontFamily:'Roboto',fontSize:20,color:'#FFF'}}>Đăng ký</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',marginBottom:10}}>
                <Text style={{fontSize: 20,color: 'black',marginRight: 3}}>Đã có tài khoản?</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("_SignIn")}}>
                  <Text style={{fontSize: 20,color: 'blue'}}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </View>
    );
  }
}
