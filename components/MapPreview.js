import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

import ENV from '../env';

const MapPreview = (props) => {
  const {onPress, style, location} = props;
  let imagePreviewUrl;

  if (location) {
    const {lat, lng} = location;
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},
    ${lng}&zoom=14&size=1000x500&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},
    ${lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.mapPreview, ...style}}>
      {location
       ? (<Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/>)
       : (<Text>No location picked yet</Text>)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
