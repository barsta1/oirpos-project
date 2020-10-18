import React from 'react';
import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import MapPreview from '../components/MapPreview';
import {COLORS} from '../utils/constants';

const PlaceDetailScreen = (props) => {
  const {navigation: {getParam, navigate}} = props;
  const placeId = getParam('placeId');
  const {lat, lng, address, imageUri} = useSelector(({places:{places}}) => places.find(({id}) => id === placeId));
  const selectedLocation = {lat, lng};

  const showMapHandler = () => {
    navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation
    });
  };

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Image source={{uri: imageUri}} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  const {navigation: {getParam}} = navData;
  return {
    headerTitle: getParam('placeTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: COLORS.GRAY
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: COLORS.GREEN,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;
