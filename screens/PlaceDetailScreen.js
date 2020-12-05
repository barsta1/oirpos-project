import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import MapPreview from '../components/MapPreview';
import {COLORS} from '../utils/constants';

const PlaceDetailScreen = (props) => {
  const {navigation: {getParam, navigate}} = props;
  const placeId = getParam('placeId');
  const {lat, lng, address, imageUri} = useSelector(({places:{places}}) => places.find(({id}) => id === placeId));
  const selectedLocation = {lat, lng};

  /**
   * A function navigation to MapScreen component upon click on MapPreview component.
   * It automatically sets readonly mode param, thus preventing from changing and saving the location in MapScreen component.
   * It also passes initialLocation param to the MapScreenComponent.
   * Each param passed through navigate() function is accessible inside the navigated component by invoking getParam(). 
   */
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

  /**
   * Navigation options for PlaceDetailScreen.
   * header title will be dynamically set to the title of the chosen place.
   */
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

PlaceDetailScreen.PropTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func
  })
}
