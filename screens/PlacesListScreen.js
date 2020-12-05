import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = (props) => {
  const {navigation: {navigate}} = props;
  const places = useSelector(({places: {places}}) => places);
  const dispatch = useDispatch();

  
  /**
   * This hook wile dispatch loadPlaces() action from Redux, each time a new dispatch instance appears.
   * It will cause places property to update with the latest versio of "places" state.
   */
  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={({id}) => id}
      renderItem={({item: {imageUri, title, address, id}}) => (
        <PlaceItem
          image={imageUri}
          title={title}
          address={address}
          onSelect={() => {navigate('PlaceDetail', {placeTitle: title, placeId: id});}}
        />
      )}
    />
  );
};

  /**
   * Navigation options for PlacesListScreen component.
   * Header title will be "All places" and the button on the right side of the header will be an icon for adding a new place. Click event on that icon will redirect the user to NewPlaceScreen.
   */
PlacesListScreen.navigationOptions = (navData) => {
  const {navigation: {navigate}} = navData;
  
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName='md-add'
          onPress={() => {navigate('NewPlace');}}
        />
      </HeaderButtons>
    )
  };
};

export default PlacesListScreen;

PlacesListScreen.PropTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
}
