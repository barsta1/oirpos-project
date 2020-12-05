import * as FileSystem from 'expo-file-system';

import {insertPlace, fetchPlaces} from '../utils/helpers/databaseHelpers';
import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

/**
 * An action creator for updating Redux state with new place as well as inserting new data to database
 * In order to perform this action correctly, an active Google API Key is required.
 * 
 * NOTE: API key used in this project will not be active forever, it may expire in some time, causing
 * data insertion to fail!
 * 
 * @param  {string} title
 * @param  {string} image
 * @param  {string} location
 */
export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}
    `)

    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const responseData = await response.json()

    if (!responseData.results) {
      throw new Error('Something went wrong');
    }

    const address = responseData.results[0].formatted_address;

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const id = new Date().getTime();
      const dbResult = await insertPlace( id, title, newPath, address, location.lat, location.lng);
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath, address,
           coords: {lat: location.lat,lng: location.lng}
        }
      });
    } catch (err) {
      throw err;
    }
  };
};

/**
 * An action creator for loading all the places.
 * Each time the data in SQLLite DB has changed this method is invoked, supplying Redux state with latest data
 */
export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
