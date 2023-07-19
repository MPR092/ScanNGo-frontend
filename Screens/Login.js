import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Error from '../Shared/error';

//Icons
import Icon from 'react-native-vector-icons/FontAwesome';

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

import isValidEmail from '../Shared/emailValid';

// Context
// import AuthGlobal from '../Context/store/AuthGlobal';
// import { loginUser } from '../Context/actions/Auth.actions';

const Login = ({navigation}) => {
  
  //context
  // const context = useContext(AuthGlobal);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (context.stateUser.isAuthenticated === true) {
  //     // props.navigation.navigate("ShoppingCart")
  //     navigation.navigate("ShoppingCart")
  //   }
  // }, [context.stateUser.isAuthenticated])

  const handleLogin = () => {
    const user = {
      email,
      password
    }


    if (email === "" || password === "") {
      setError("Please fill in the credentials");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      console.log('Success')
      // loginUser(user, context.dispacth)
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Login successful",
        text2: "Try to scan barcodes to add them to the cart"
      })

      navigation.navigate("ShoppingCart")
    }
  };

  return (
    <ImageBackground
      source={require('../My/welcome.png')}
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