import React from 'react';
import {
  View
} from 'react-native';
import styles, { colors } from '../../styles/castyle';

const CardActionSeparator = (props) => {
  const {color, height} = props;
  return(
    <View style={[styles.separator,{backgroundColor:color || 'black',height:height || 40}]}/>
  )
}

export default CardActionSeparator
