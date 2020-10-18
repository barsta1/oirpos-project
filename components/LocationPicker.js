import React, {useState, useEffect} from 'react';
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';

import MapPreview from './MapPreview';


const LocationPicker = (props) => {
  const {onLocationPicked} = props;
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam('pickedLocation')

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocation = async () => {

    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
       const {coords:{latitude, longitude}} = pos;
        setPickedLocation({
          lat: latitude,
          lng: longitude
        })
        props.onLocationPicked({
          lat: latitude,
          lng: longitude
        })
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
  };

  pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  }


  return (
    <View style={styles.locationPicker}>
      <MapPreview onPress={pickOnMapHandler} style={styles.mapPreview} location={pickedLocation}/>
      <View style={styles.actions}>
        <Button title="Get user location" color='red' onPress={getLocation}/>
        <Button title='Pick on map' color='red' onPress={pickOnMapHandler}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;