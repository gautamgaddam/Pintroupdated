import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import ActionHeader from "./actionHeader";
import { Actions } from "react-native-router-flux";
import {Hoshi} from "react-native-textinput-effects";
// import { ScrollView } from "react-native-gesture-handler";

import {validateAll} from 'indicative/validator';

export default class PDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      re_password: "",
      userData:'',
      error:{}
    };
  }

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

  saveData = async (data) => {

    const rules={
      first_name:'required|string',
      last_name:'required|string',
      email:'required|email',
      password:'required|string|min:6|confirmed'
    }

    const message= {
      required: (field) => `${field} is required`,
      'email.email': 'Please enter valid email',
      'password.confirmed': 'The password did not match',
      'password.min':'The password is too short'
    }
    try{

      await validateAll(data, rules, message)
      // let response= await fetch(
      //   "http://ec2-52-15-192-138.us-east-2.compute.amazonaws.com:6222/add-user",
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       email: data.email,
      //       first_name:  data.first_name,
      //       last_name: data.last_name,
      //       password: data.password,
      //       re_password: data.re_password
      //     })
      //   })
        this.setState({
          userData: response
        })

        // .then(response => response.json())
        // .then(responseJson => {
        //   if (responseJson.length > 0 && responseJson[0] != undefined) {
        //     global.email = this.state.email;
        //     if (responseJson[0].add_user) {
        //       Actions.profilePhoto();
        //     } else {
        //       Actions.profilePhoto();
        //     }
        //   }
        // })
        // .catch(error => {
        //   console.error(error);
        // });
     }catch(errors){
      
      const formattedErrors= {}
      errors.forEach(error=> formattedErrors[error.field]= error.message);
      this.setState({
        error: formattedErrors
      })

    }
    



  
  };

  render() {
     return (
      <KeyboardAvoidingView style={{flex:1}} behavior= "padding">
      <ScrollView >
<View style={styles.container}>
      <View>
      <View  style={styles.inputBox}>
        <Hoshi
         
          label={'First Name'}
          borderColor={'#b76c94'}
          borderHeight={2}
          value={this.state.first_name}
          onChangeText={first_name => this.setState({ first_name })}
        />
    {this.state.error['first_name'] && <Text style={styles.errorText}>{this.state.error['first_name']}</Text> }
    </View>
    <View  style={styles.inputBox}>
        <Hoshi
       
        label={'Last Name'}
        borderColor={'#b76c94'}
        borderHeight={2}
        value={this.state.last_name}
        onChangeText={last_name => this.setState({ last_name })}
      />
      {this.state.error['last_name'] && <Text style={styles.errorText}>{this.state.error['last_name']}</Text> }
      </View>
      <View style={styles.inputBox}>
      <Hoshi
      
      label={'Email'}
      borderColor={'#b76c94'}
      borderHeight={2}
      value={this.state.email}
      onChangeText={email => this.setState({ email })}
    />
    {this.state.error['email'] && <Text style={styles.errorText}>{this.state.error['email']}</Text> }
    </View>
    <View style={styles.inputBox}>
    <Hoshi
    
    label={'Password'}
    secureTextEntry
    borderColor={'#b76c94'}
    borderHeight={2}
    value={this.state.password}
    onChangeText={password => this.setState({ password })}
  />
  {this.state.error['password'] && <Text style={styles.errorText}>{this.state.error['password']}</Text> }
  </View>
  <View style={styles.inputBox}>
  <Hoshi
  
  label={'Confirm Password'}  
  secureTextEntry
  borderColor={'#b76c94'}
  borderHeight={2}
  value={this.state.re_password}
  onChangeText={re_password => this.setState({ re_password })}
/>  
{this.state.error['re_password'] && <Text style={styles.errorText}>{this.state.error['re_password']}</Text> }
</View>

</View>
<View>
        <Text style={styles.terms}>
          By clicking on Sign Up, you agree to out User Terms & Privacy Policy
        </Text>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.buttonText} onPress={()=>this.saveData(this.state)}>
            Sign Up
          </Text>
        </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexDirection: 'column',
    flex: 1,
    padding: 15
  },
  inputBox: {
   backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: 16,
    color: "#002f6c",
    
    width: 100 + "%",
  
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    padding: 10,
    
  },
  submitButton: {
    backgroundColor: "#472965"
  },
  terms: {
    margin: 25
  },
  errorText:{
    color:'red',
    fontSize:10
  }
});
