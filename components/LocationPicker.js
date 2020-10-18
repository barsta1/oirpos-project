import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';

import MapPreview from './MapPreview';
import {COLORS} from '../utils/constants';
import PositionGetter from '../utils/helpers/positionGetter';
import showPermissionsAlert from '../utils/helpers/permissionsAlert';

const LocationPicker = (props) => {
  const {onLocationPicked, navigation: {getParam, navigate}} = props;
  const {geolocation: {getCurrentPosition}} = navigator;
  const [pickedLocation, setPickedLocation] = useState();
  const mapPickedLocation = getParam('pickedLocation')

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== 'granted') {
      showPermissionsAlert();
      return false;
    }
    
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    getCurrentPosition(
      (pos) => PositionGetter.success(pos, setPickedLocation, onLocationPicked),
      PositionGetter.error,
      PositionGetter.options
    );
  };

  pickOnMapHandler = () => {
    navigate('Map')
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview onPress={pickOnMapHandler} style={styles.mapPreview} location={pickedLocation}/>
      <View style={styles.actions}>
        <Button title='Get user location' color={COLORS.GREEN} onPress={getLocation}/>
        <Button title='Pick on map' color={COLORS.GREEN} onPress={pickOnMapHandler}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: COLORS.GRAY,
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;
