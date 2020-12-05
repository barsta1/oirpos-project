import {Alert} from 'react-native';

/**
 * Uses React Native API, to call alert method, that renders Alert component to the screen.
 */
export default () => {
  Alert.alert(
  'Insufficient permissions!',
  'You need to grant camera permissions to use this app.',
  [{text: 'Okay'}]
  )
};
