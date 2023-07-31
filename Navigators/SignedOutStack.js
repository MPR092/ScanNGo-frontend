import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import WelcomeIcon from "../Screens/WelcomeIcon";

const MySignedOutStack = createNativeStackNavigator();

function SignedOutStack() {
  return (
    <NavigationContainer>
      <MySignedOutStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          title: "Login",
        }}
      >
        <MySignedOutStack.Screen
          name="Welcome"
          component={WelcomeIcon}
          options={{ headerShown: false, title: "ScanNGo" }}
        />
        <MySignedOutStack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false, title: "Register" }}
        />
        <MySignedOutStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, title: "Login" }}
        />
      </MySignedOutStack.Navigator>
    </NavigationContainer>
  );
}

export default SignedOutStack;
