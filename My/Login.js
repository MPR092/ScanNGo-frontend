import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LoginPage = () => {
  const handleLogin = () => {
    // Handle login logic here
  };

const handleRegister = () => {
    // Handle register logic here
  };

  return (
    <ImageBackground
      source={require('../My/welcome.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <Text style={styles.logo}>Scan N Go</Text>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerLink} onPress={handleRegister}>
            <Text style={styles.registerText}>New User? Register here</Text>
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
    width: '80%',
  },
  input: {
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

export default LoginPage;