import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView, Button} from "react-native";
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import * as placesActions from '../store/places-actions';

import LocationPicker from '../components/LocationPicker';
import ImagePicker from '../components/ImagePicker';
import {COLORS} from '../utils/constants';

const NewPlaceScreen = (props) => {
  const {navigation: {goBack}} = props;
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null)
  const dispatch = useDispatch()
  
  /**
   * A function for handling TextInput value.
   * @param  {string} text
   */
  const handleTitleChange = (text) => {
    setTitleValue(text);
  };

  /**
   * A function for saving and adding a new place.
   * It dispatches an action to redux, thus updating the "places" state chunk.
   */
  const handleSavePlace = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    goBack();
  }
  /**
   * A function for saving the image path.
   * It is called inside ImagePicker component.
   * @param  {string} imagePath
   */
  const onImageTake = (imagePath) => {
    setSelectedImage(imagePath);
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location) 
   })

  return (
    <ScrollView>
      <View style={styles.form}>
      <Text style={styles.label}></Text>
      <TextInput style={styles.textInput} onChangeText={handleTitleChange} value={titleValue}/>
      <ImagePicker onImageTake={onImageTake}/>
      <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
      <Button title='Save Place' color={COLORS.GREEN} onPress={handleSavePlace}/>
      </View>
    </ScrollView>
  );
}

  /**
   * NewPlaceScreen navigation options.
   * Title on the header of this screen will be set to "headerTitle" property.
   */
NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add New Place'
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;

NewPlaceScreen.PropTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  })
}
