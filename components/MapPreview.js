import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

import ENV from '../env';

const MapPreview = props => {
  let imagePreviewUrl;
  if (props.location) {
    if (props.location) {
      imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
        props.location.lat
      },${
        props.location.lng
      }&zoom=15&size=1000x400&maptype=roadmap&markers=color:red%7Clabel:A%7C${
        props.location.lat
      },${props.location.lng}&key=${ENV.googleApiKey}`;
    }
  }
  console.log(imagePreviewUrl, 'imagePreviewUrl')
  return (
  <TouchableOpacity onPress={props.onPress} style={{...styles.MapPreview, ...props.style}}>
    {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children}
  </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})

export default MapPreview;