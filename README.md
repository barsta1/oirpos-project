# oirpos-project

This app was created with help of [Expo](https://expo.io/) and [React Native](https://reactnative.dev/).
It was a project for Organization and Development of Open Source Projects subject during my Master Studies at [Silesian University of Technology](https://www.polsl.pl/en/pages/welcome.aspx).
Main libraries used in the project are:
* [React Native](https://reactnative.dev/)
* [Redux](https://redux.js.org/)
* [React Redux](https://react-redux.js.org/)
* [SQLLite](https://www.sqlite.org/index.html)
* [React Navigation (v4)](https://reactnavigation.org/)

The whole project was based on [Academind React Native App](https://pro.academind.com/p/react-native-the-practical-guide-2020)
A demo of my app can be found on: [giphy.com](https://giphy.com/gifs/SGHZjFBoAZpU3KjfRa).

## Project goal
The goal was to create a functional app, which would utilize Map interface in conjunction with database and frontend.\
SQLLite DB was chosen as it is fairly easy to integrate it together with Expo and React Native.\
I chose React Native as a framework for developing this app over Flutter, Xamarin etc. as it is fairly fast and guarantees some highly desirable functionalities as far as mobile app development is concerned.\
Apart from that, it isn't that cumbersome to use, the API is friendly enough, especially if you are a person, who already has some decent experience with React.

## Screen components
* MapScreen\
It displays a screen with a map. If user is in "readonly" mode, only browsing through the map is allowed. Otherwise, the user can tap the desired place on the screen and add a new marker.
It will mark the position of the place to add. In the end a button for saving the place can be tapped - the place coordinates will be saved.
* NewPlaceScreen\
A simple form-alike screen for adding new places to the list of all places displayed on PlacesListScreen.
* PlaceDetailScreen\
A screen that shows the details on the given saved place. Looks familiar to NewPlaceScreen, except the fact, that when user enters the map from this screen, the mode will be set to "readonly".
* PlacesListScreen\
A main screen, which shows the screens, a user has saved.

Note: More precise development documentation (JSDoc comments, PropTypes, smaller components) can be found inside the project folder.
