// import { createStackNavigator, createAppContainer } from 'react-navigation';
// import HomeScreen from './src/screens/HomeScreen';
// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen
//   },
//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {
//       title: 'App'
//     }
//   }
// );
// export default createAppContainer(navigator);


import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import Routes from "./Routes.js";

export default class reactTutorialApp extends Component {
  render() {
    console.disableYellowBox = true;
    return <Routes />;
  }
}
AppRegistry.registerComponent("Pintro", () => reactTutorialApp);

