import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import {ICON_SIZE} from '../utils/constants';

const CustomHeaderButton = (props) => {
  return <HeaderButton
   {...props}
    IconComponent={Ionicons}
    iconSize={ICON_SIZE.LARGE}
    color='#000'/>
}

export default CustomHeaderButton;