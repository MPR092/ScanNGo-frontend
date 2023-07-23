import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; //Navigation Stack

//Redux
import { Provider } from 'react-redux'
import store from './Redux/store'

// Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import ShoppingCart from "./Screens/ShoppingCart";
import Success from "./Screens/Success";
import WelcomeIcon from "./Screens/WelcomeIcon";
import Help from "./Screens/Help";

//ignore the logging errors in runtime
import { LogBox } from "react-native";

//Ignore all logs (warning)
// LogBox.ignoreAllLogs(true);

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            title: "Login",
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeIcon}
            options={{ headerShown: false, title: "ScanNGo" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, title: "Register" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, title: "Login" }}
          />
          <Stack.Screen
            name="Help"
            component={Help}
            options={{ headerShown: false, title: "Help" }}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            options={{ headerShown: true, title: "Checkout" }}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{ headerShown: true, title: "Cart" }}
          />
        </Stack.Navigator>
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
      <Toast />
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      </Provider>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
