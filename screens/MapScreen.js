import React, {useState, useEffect, useCallback} from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {COLORS, GLIWICE_COORDS, MAP_DELTA} from '../utils/constants'

const MapScreen = (props) => {
  const {navigation: {getParam}} = props;
  const initialLocation = getParam('initialLocation');
  const readonly = getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? Number(initialLocation.lat) : GLIWICE_COORDS.lat,
    longitude: initialLocation ? Number(initialLocation.lng) : GLIWICE_COORDS.lng,
    latitudeDelta: MAP_DELTA.lat,
    longitudeDelta: MAP_DELTA.lng
  };

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

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location was chosen!',
        'Please choose a location',
        [{text: 'Okay'}]
      )

      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
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
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

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
