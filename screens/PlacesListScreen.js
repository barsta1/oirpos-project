import React, {useEffect} from 'react';
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
