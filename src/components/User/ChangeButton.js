import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

export default class ChangeButton extends Component{
  constructor(props){
    super(props);
    const {defaultValue} = props;
    this.state ={
      isActive: defaultValue || false
    }
  }
  render(){
    const { ain,aic,iain,iaic,style,size} = this.props;
    const {isActive} = this.state;
    return(
      <TouchableOpacity
        style={style}
        onPress = {this.setState({isActive: !this.state.isActive})}
      >
        <Ionicons
          name={isActive? ain : iain}
          color={isActive? aic : iaic}
          size={size}
        />
      </TouchableOpacity>
    )
  }
}

ChangeButton.propTypes ={
  defaultValue:PropTypes.bool,
  ain: PropTypes.string,
  aic: PropTypes.string,
  iain: PropTypes.string,
  iaic: PropTypes.string,
  style: PropTypes.number,
  size: PropTypes.number
}
