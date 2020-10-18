import {Alert} from 'react-native';

export default () => {
  Alert.alert(
  'Insufficient permissions!',
  'You need to grant camera permissions to use this app.',
  [{text: 'Okay'}]
  )
};
