import Place from '../utils/models/place'
import {ADD_PLACE, SET_PLACES} from './places-actions';
const initialState = {
  places: []
};

/**
 * @param  {Object} state=initialState
 * @param  {Object} action - an action payload
 * @returns {Object} state - an updated state
 */
export default (state = initialState, action) => {

  switch(action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(place => new Place(
          place.id.toString(),
          place.title,
          place.imageUri,
          place.address,
          place.lat,
          place.lng
        ))
      }
    case ADD_PLACE:
      const {placeData: {id, title, image, address, coords: {lat,lng}}} = action;
      const newPlace = new Place(id, title, image, address, lat, lng);
      return {
        places: state.places.concat(newPlace)
      }
      default: return state;
  }
}