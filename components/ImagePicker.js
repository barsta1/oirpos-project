import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { COLORS } from '../utils/constants';
import showPermissionsAlert from '../utils/helpers/permissionsAlert';

const ImgPicker = (props) => {
  const {onImageTake} = props;
  const [pickedImage, setPickedImage] = useState();

  /**
   * Asks for permissions to camera roll and a camera itself.
   * If permissions were granted, true will be returned
   * @returns {boolean} truthy/falsy value, indicating whether permissions were granted
   */
  const verifyPermissions = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);

    if (status !== 'granted') {
      showPermissionsAlert();
      return false;
    }

    return true;
  };

  
  /**
   * checks whether given user has accepted camera permissions,
   * if yes, then camera is launched by calling launchCameraAsync on expo API component - ImagePicker
   * Apart from that, after the image was taken, the URI received from async method will be assigned to
   * form a proper state
   */
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    
    const {uri} = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(uri);
    onImageTake(uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title='Take Image'
        color={COLORS.GREEN}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;

ImagePicker.PropTypes = {
  onImageTake: PropTypes.func
}
