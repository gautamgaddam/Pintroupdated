import React from "react";
import { Router, Scene } from "react-native-router-flux";
import signup from "./components/signup.js";
import intro from "./components/intro";
import linkedIn from "./components/linkedIn";
import pDetails from "./components/pDetails";
import profilePhoto from "./components/profilePhoto";
import moreDetails from './components/moreDetails';

const Routes = () => (
  <Router>
  <Scene key="root">
  <Scene key="home" component={intro} initial={true} /> 
  <Scene key="signup" component={signup} />
  <Scene key="linkedIn" component={linkedIn} />
  <Scene key="pDetails" component={pDetails} />
  <Scene key="profilePhoto" component={profilePhoto} />
  <Scene key="moreDetails" component={moreDetails}></Scene>
</Scene>
  </Router>
);
export default Routes;