import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Icons
import Icon from 'react-native-vector-icons/FontAwesome';

//Validation
import isValidEmail from '../Shared/emailValid';

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

//Displaying error over the submit button
import Error from "../Shared/error";

//communication with the server
// import axios from "axios";
import baseURL from '../assets/common/BaseUrl';



const Register = ({ navigation }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    // event.preventDefault();

    if ( name === "" | email === "" || password === "" ) {
      setError("Please fill in the credentials")
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      console.log('Success')
    }

    let user = {
      name: name,
      email: email,
      password: password,
      isAdmin: false,
    }
    // console.log(user);

    // Local
    // 142.3.83.67 - University of Regina's IP
    // axios.post("http://192.168.40.36:3000/api/v1/users/register", user, {
    axios.post("http://142.3.83.67:3000/api/v1/users/register", user, {
      "Content-Type": "application/json",
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration successful",
            text2: "Please login into your account "
          })
          setTimeout(() => {
            navigation.navigate("Login");
          }, 500)
        }
      }).catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });

  };

  return (
      <ImageBackground
        source={require("../assets/images/welcome.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* <Text style={styles.logo}>Scan N Go</Text> */}
          <Text style={styles.title}>Register</Text>
          <View style={styles.formContainer}>
            
          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <Icon name="user" size={23} color="white" style={{ alignSelf: 'auto', marginRight: 19, marginLeft: 10, marginBottom: 20 }} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#ffffff"
              keyboardType="default"
              autoCapitalize="none"
              id={'name'}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <Icon name="envelope" size={20} color="white" style={{ alignSelf: 'auto', marginRight: 15, marginLeft: 10, marginBottom: 20 }} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              keyboardType="email-address"
              autoCapitalize="none"
              id={'email'}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="lock" size={23} color="white" style={{ alignSelf: 'auto', marginRight: 13, marginLeft: 10, marginBottom: 20, padding: 3 }} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              autoCapitalize="none"
              id={'password'}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            </View>

            <View style={styles.outlinedText}>
              {error ? <Error message={error} /> : null }
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.registerText}>old user! Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  outlinedText: {
    // flex: 1,
    // borderWidth: 0.5,
    // borderColor: 'red',
    // padding: 0.1,
    borderRadius: 15,
    marginBottom: 10
    // fontSize: 16,
    // fontWeight: 'bold',
    // color: 'red',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    // backgroundColor: 'rgba(25, 25, 255, 0.6)'
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#ffffff",
  },
  formContainer: {
    width: "85%",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent input field
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 16,
    // backgroundColor: 'blue',
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000000",
    // color: '#ffffff',
  },
  button: {
    alignSelf: 'center',
    width: '85%',
    // flex: 1,
    backgroundColor: "#6342E8",
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerLink: {
    marginTop: 10,
    // marginLeft: 5,
  },
  registerText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "right",
    // textAlign: 'auto',
    textDecorationLine: "underline",
  },
});

export default Register;
