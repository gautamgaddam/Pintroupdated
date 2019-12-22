import * as React from "react";
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import Svg, { Ellipse } from "react-native-svg";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Actions } from "react-native-router-flux";
import ActionHeader from './actionHeader';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null
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
    let { image } = this.state;
    return (
      <View style={styles.container}>
            <View style={styles.skipColumn}>

          <TouchableOpacity onPress={this.skipImage}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.imgMain}>
          <TouchableOpacity
            style={styles.ellipseStack}
            onPress={this._pickImage}
          >
            {image !== null ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Svg viewBox="0 0 100.00 100.00" style={styles.ellipse}>
                <Ellipse
                  strokeWidth={1}
                  fill="rgba(13,33,121,1)"
                  stroke="rgba(230, 230, 230,1)"
                  cx={50}
                  cy={50}
                  rx={50}
                  ry={50}
                ></Ellipse>
              </Svg>
            )}

            <EntypoIcon
              name="controller-record"
              style={styles.icon4}
            ></EntypoIcon>
            <FeatherIcon name="plus" style={styles.icon5}></FeatherIcon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.buttonText} onPress={this.saveData}>
            Add your profile photo
          </Text>
        </TouchableOpacity>
        </View>
          <View style={styles.iconMain}>
          <FeatherIcon
            name="arrow-right"
            style={styles.icon}
          ></FeatherIcon>
          </View>
       
       
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  skipImage = () => {
    Actions.moreDetails();
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64"
      });
      imageString = "'data:image/jpeg;base64," + base64 + "'";
      this.setState({
        image: result.uri,
        type: result.uri.substring(result.uri.lastIndexOf(".")),
        imageString: base64,
        email: global.email
      });
    }
  };

  saveData = async () => {
    fetch(
      "http://ec2-52-15-192-138.us-east-2.compute.amazonaws.com:6222/upload-img",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          Actions.moreDetails();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-between',
    margin: 20
  },
  skip: {
    color: "#000000",
    fontWeight:'bold',
    fontSize:15
  },
  imgMain:{
    alignSelf: 'center',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  ellipse: {
   
    width: 100,
    height: 100,
   
  },
  icon4: {
    top: 58,
    left: 60,
    position: "absolute",
    color: "#ffffff",
    fontSize: 42
  },
  icon5: {
    top: 65,
    left: 66,
    position: "absolute",
    color: "rgba(98,34,56,1)",
    fontSize: 30
  },
  ellipseStack: {
    width: 100,
    height: 100,
 
  },

  iconMain:{
    borderRadius: 50,
    backgroundColor:'#000000',
    width:50,
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'flex-end'
  },
  icon: {
    color: "white",
    fontSize: 30,
    fontWeight:'normal'
  },

  skipColumnFiller: {
    flex: 1
  },
  skipColumn:{
    alignSelf:'flex-end'
  },
  loremIpsum: {
    color: "#121212",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",
    padding: 10
 
  },
  submitButton: {
    backgroundColor: "#EAE9EE",
    marginTop:20
  }
});
