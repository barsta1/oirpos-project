import React from "react";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StyleSheet, Text, View } from "react-native";

import PlacesNavigator from "./navigation/PlacesNavigator";
import PlacesReducer from  './store/places-reducer';
import { init } from "./utils/helpers/databaseHelpers";

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  places: PlacesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator/>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
