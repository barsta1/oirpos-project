import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import {COLORS} from '../utils/constants';


const placesNavigator = createStackNavigator({
  PlacesList: PlacesListScreen,
  PlaceDetail: PlaceDetailScreen,
  Map: MapScreen,
  NewPlace: NewPlaceScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: COLORS.GREEN
    },
    headerTintColor: COLORS.WHITE
  }
})

export default createAppContainer(placesNavigator);
