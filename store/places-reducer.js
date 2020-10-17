import Place from '../utils/models/place'
import {ADD_PLACE, SET_PLACES} from './places-actions';
const initialState = {
  places: []
};

export default (state = initialState, action) => {

  switch(action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(place => new Place(
          place.id.toString(),
          place.title,
          place.imageUri
        ))
      }
    case ADD_PLACE:
      const {placeData: {id, title, image}} = action;
      const newPlace = new Place(id, title, image, null, null, null);
      return {
        places: state.places.concat(newPlace)
      }
      default: return state;
  }
}