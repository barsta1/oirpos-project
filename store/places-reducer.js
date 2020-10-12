import Place from '../utils/models/place'
import {ADD_PLACE} from './places-actions';
const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.placeData.title, null, null, null, null);
      return {
        places: state.places.concat(newPlace)
      }
      default: return state;
  }
}