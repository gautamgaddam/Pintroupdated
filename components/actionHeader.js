import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";

export default class ActionHeader extends Component {
  render() {
    return (
      <View style={styles.main}>
       <Text style={styles.mainText}>Pintro</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
   main:{
    flexDirection: "row",
    color:"#ffffff"
   },
   mainText:{
     color:"#ffffff",
     fontSize:20
   },
})