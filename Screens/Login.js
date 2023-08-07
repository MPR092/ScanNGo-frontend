import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable } from 'react-native';
import Error from '../Shared/error';

//Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

//shared
import isValidEmail from '../Shared/emailValid';
import { useTogglePasswordVisibility } from '../Shared/Hooks/useTogglePasswordVisibility';
import baseURL from '../assets/common/BaseUrl'

//Bottom Tab Navigator
// import Main from "../Navigators/main";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

// Context
// import AuthGlobal from '../Context/store/AuthGlobal';
// import { loginUser } from '../Context/actions/Auth.actions';

const Login = (props, {navigation}) => {
  
  //context
  // const context = useContext(AuthGlobal);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  // useEffect(() => {
  //   if (context.stateUser.isAuthenticated === true) {
  //     // props.navigation.navigate("ShoppingCart")
  //     navigation.navigate("ShoppingCart")
  //   }
  // }, [context.stateUser.isAuthenticated])

  const handleLogin = async () => {

    // try {

      if (email === "" || password === "") {
        setError("Please fill in the credentials");
      } else if (!isValidEmail(email)) {
        setError("Please enter a valid email address");
      } else {
        // console.log('Success, No Validation Errors')        
        // console.log(`Email: ${email}, Password: ${password}`)
        
        
        // Send login request to the API
        axios.post(`${baseURL}/users/login`, {
          email,
          password,
        }, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          // console.log("Got a response")
          // console.log(res.data)
          // Check if the API response contains the email and JWT token
          if (res.data.user && res.data.USER && res.data.token) {
            // Save the JWT token securely in AsyncStorage
            AsyncStorage.setItem('token', res.data.token);
            AsyncStorage.setItem('USER', JSON.stringify(res.data.USER));
          }
          else  {
            console.log("Device: Async Storage Error");
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Device: Async Storage Error",
              text2: "Cannot store user credentials",
            });
          }

          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Login successful",
            text2: `Welcome, ${res.data.USER.name}!`,
            // text3: "Try to scan barcodes to add them to the cart"
          })//toast

          // navigation.navigate("ShoppingCart")
          props.navigation.navigate('Main')

        })//then
        .catch(error => {
          // Handle error response from server
          
          if (error.response && error.response.status === 401) {
            // Invalid credentials, display error message
            setError('Invalid credentials. Please try again.');
          }else if (error && error.response.status === 400) {
            // Invalid credentials, display error message
            setError(error.response.data);
            // console.log(error.response.data)
          } else {
            // Other errors, display a generic error message
            setError('An error occurred. Please try again later.');
          }
        });

      }
    // } catch (error) {
    //   // Handle error
    //   setError('Something went wrong');
    // }

  };

  return (
    <ImageBackground
      source={require('../assets/images/welcome.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
      {/* <Text style={styles.logo}>Scan N Go</Text> */}
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>

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
          <Icon name="lock" size={23} color="white" style={{ alignSelf: 'auto', marginRight: 15, marginLeft: 10, marginBottom: 20, padding: 2 }} />
          <TextInput
            style={styles.inputEye}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={passwordVisibility}
            autoCapitalize="none"
            id={'password'} 
            value={password}
            onChangeText={(text) => setPassword(text)}
            
          />
          <View style={styles.eye}>
          <Pressable
                // style={{ width: "100%" }}
                onPress={handlePasswordVisibility}
              >
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={20}
                  color="#ffffff"
                />
          </Pressable>
          </View>
        </View>
        

          <View style={styles.outlinedText}>
            {error ? <Error message={error} /> : null }
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>new user! Register here</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    // backgroundColor: 'rgba(25, 25, 255, 0.6)'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ffffff',
  },
  formContainer: {
    width: '85%',
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
  },
  inputEye: {
    flex: 5,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent input field
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  eye: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent input field
    // borderRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000000',
    // color: '#ffffff',
  },
  button: {
    alignSelf: 'center',
    width: '85%',
    backgroundColor: '#6342E8',
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 10,
    // marginLeft: 5,
  },
  registerText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default Login;