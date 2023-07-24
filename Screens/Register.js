import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Icons
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Validation shared files
import isValidEmail from "../Shared/emailValid";
import { useTogglePasswordVisibility } from "../Shared/Hooks/useTogglePasswordVisibility";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

//Displaying error over the submit button
import Error from "../Shared/error";

//communication with the server
import axios from "axios";
import baseURL from "../assets/common/BaseUrl";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const handleRegister = () => {
    // event.preventDefault();

    if ((name === "") | (email === "") || password === "") {
      setError("Please fill in the credentials");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      // console.log('Registeration Started')

      let user = {
        name: name,
        email: email,
        password: password,
        isAdmin: false,
      };
      // console.log(user);

      // Register user to database using server api
      axios
        .post(`${baseURL}/users/register`, user, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          // console.log(res);
          console.log("Registration Successfull");
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Registration successful",
              // text2: `Please login into your account`
              text2: `${res.data.name} Please login into your account`,
            });
            setTimeout(() => {
              navigation.navigate("Login");
            }, 500);
          }
        })
        .catch((error) => {
          // Handle error response from server

          if (error && error.response.status === 401) {
            // Invalid credentials, display error message
            setError(error.response.data);
            Toast.show({
              topOffset: 60,
              type: "info",
              text1: "Email Already Exists",
              text2: "Please try a different email",
            });
            // console.log(error.response.data)
          } else {
            // Other errors, display a generic error message
            setError("An error occurred. Please try again later.");
          }

          // setError("Unable to connect to Server");
        });

    }
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="user"
              size={23}
              color="white"
              style={{
                alignSelf: "auto",
                marginRight: 19,
                marginLeft: 10,
                marginBottom: 20,
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#ffffff"
              keyboardType="default"
              autoCapitalize="none"
              id={"name"}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="envelope"
              size={20}
              color="white"
              style={{
                alignSelf: "auto",
                marginRight: 15,
                marginLeft: 10,
                marginBottom: 20,
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              keyboardType="email-address"
              autoCapitalize="none"
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="lock"
              size={23}
              color="white"
              style={{
                alignSelf: "auto",
                marginRight: 13,
                marginLeft: 10,
                marginBottom: 20,
                padding: 3,
              }}
            />
            <TextInput
              style={styles.inputEye}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={passwordVisibility}
              autoCapitalize="none"
              id={"password"}
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
            {error ? <Error message={error} /> : null}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRegister()}
          >
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
    marginBottom: 10,
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
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent input field
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#ffffff",
    fontSize: 16,
    // backgroundColor: 'blue',
  },
  inputEye: {
    flex: 5,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent input field
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#ffffff",
    fontSize: 16,
  },
  eye: {
    flex: 1,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent input field
    // borderRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: 16,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000000",
    // color: '#ffffff',
  },
  button: {
    alignSelf: "center",
    width: "85%",
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
