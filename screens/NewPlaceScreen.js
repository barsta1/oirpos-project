import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import * as placesActions from '../store/places-actions';

import ImagePicker from '../components/ImagePicker';

const NewPlaceScreen = (props) => {
  const {navigation: {goBack}} = props;
  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch()

  const handleTitleChange = (text) => {
    setTitleValue(text);
  };

  const handleSavePlace = () => {
    dispatch(placesActions.addPlace(titleValue));
    goBack();
  }

  return (
    <ScrollView>
      <View style={styles.form}>
      <Text style={styles.label}></Text>
      <TextInput style={styles.textInput} onChangeText={handleTitleChange} value={titleValue}/>
      <ImagePicker/>
      <Button title='Save Place' color='red' onPress={handleSavePlace}/>
      </View>
    </ScrollView>
  );
}

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
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;