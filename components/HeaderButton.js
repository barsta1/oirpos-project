import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

import {COLORS, ICON_SIZE} from '../utils/constants';

const CustomHeaderButton = (props) => {
  return <HeaderButton
   {...props}
    IconComponent={Ionicons}
    iconSize={ICON_SIZE.LARGE}
    color={COLORS.WHITE}/>
}

export default CustomHeaderButton;