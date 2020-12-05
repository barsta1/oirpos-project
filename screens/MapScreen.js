import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {COLORS, GLIWICE_COORDS, MAP_DELTA} from '../utils/constants'

const MapScreen = (props) => {
  const {navigation: {getParam, setParams, navigate}} = props;
  const initialLocation = getParam('initialLocation');
  const readonly = getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? Number(initialLocation.lat) : GLIWICE_COORDS.lat,
    longitude: initialLocation ? Number(initialLocation.lng) : GLIWICE_COORDS.lng,
    latitudeDelta: MAP_DELTA.lat,
    longitudeDelta: MAP_DELTA.lng
  };

  /**
   * Method for getting coordinates based on the clicked place on a map.
   * If edit mode isn't toggled, the method will return nothing
   * @param {Object} event
   */
  const selectLocationHandler = (event) => {
    const {nativeEvent: {coordinate: {latitude, longitude}}} =event;
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: Number(latitude),
      lng: Number(longitude)
    });
  };

  /**
   * A method for saving the location picked on the map. If location was saved, the user
   * will be redirected to NewPlaceScreen component, NewPlaceScreenComponent will receive an object
   * with pickedLocation param equal to selectedLocation.
   * If no location was selected, nothing will be returned.
   */
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location was chosen!',
        'Please choose a location',
        [{text: 'Okay'}]
      )

      return;
    }
    navigate('NewPlace', {pickedLocation: selectedLocation});
  }, [selectedLocation]);

  /**
   * This hook will pass a new instance of savePickedLocationHandler to the MapScreen.navigationOptions
   * so that the user can save the location by clicking on the button on a right side of navigation.
   */
  useEffect(() => {
    setParams({saveLocation: savePickedLocationHandler});
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    const {lat, lng} = selectedLocation;
    markerCoordinates = {
      latitude: Number(lat),
      longitude: Number(lng)
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}>
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}/>
      )}
    </MapView>
  );
};

  /**
   * MapScreen navigation options.
   * a horizontal navigation bar that renders a button for saving location as long as readonly mode is turned off.
   * Params specified in getParam() method may derive from body of this (MapScreen) component or component that pushed the current route on top of routing stack.
   */
MapScreen.navigationOptions = (navData) => {
  const {navigation: {getParam}} = navData;
  const saveLocation = getParam('saveLocation');
  const readonly = getParam('readonly');

  if (readonly) {
    return {};
  }

  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: COLORS.WHITE
  }
});

export default MapScreen;

MapScreen.PropTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    setParams: PropTypes.func,
    navigate: PropTypes.func
  })
}
