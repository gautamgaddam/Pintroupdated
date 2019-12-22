import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ActionHeader from "./actionHeader";

export default class Home extends Component {

  goToSignUp = () => {
    Actions.pDetails();
  };

  goToLinkedIn = () => {
    Actions.linkedIn();
  };
  static navigationOptions = {
    headerTitle: () => <ActionHeader />,
    headerTintColor: "#606070",
    headerStyle: {
        backgroundColor: '#41225e',
      },
    headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
  };
  render() {
    return (
      <View style={styles.main}>
     
      <View style={styles.mainButtons}>
        <Button
          buttonStyle={[styles.btnContainer, styles.linContainer]}
          onPress={this.goToLinkedIn}
          icon={
              <View style={styles.iconContainer}>
            <Icon
              name="linkedin-in"
              color="black"
              size={20}
            /></View>
          }
          title="Sign Up with LinkedIn"
        />
        <Text style={styles.txtContainer}> OR </Text>
        <Button
          buttonStyle={[styles.btnContainer, styles.supContainer]}
          onPress={this.goToSignUp}
          icon={
              <View  style={styles.iconContainer}>
            <IconEntypo
              name="mail"
              color="black" 
              size={20}
            /></View>
          }
          title="Sign Up with Email"
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
   marginLeft:10,
   marginRight: 10,
   marginBottom:40,
   marginTop:40,
   borderRadius: 30,
   paddingLeft:5,
   paddingRight:10,
   flexDirection:'row',
   justifyContent:'flex-start',
   width: 100+"%",
  },
  linContainer: {
    backgroundColor: "#f13768"
  },
  supContainer: {
    backgroundColor: "#41225e"
  },
  txtContainer: {
    textAlign: "center"
  },
  iconContainer: {
    backgroundColor:'#fff',
    borderRadius:50,
    marginRight:20,
    padding:5
  },
 
  main:{
    flex:1,
    backgroundColor:'#ffffff'
  },
  actionHead:{
    flex: 1
  },
  mainButtons:{
    flex: 5,
    flexDirection:'column',
    alignItems:'center',
    justifyContent: "center"
  }
});
