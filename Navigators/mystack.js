import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//Icons
import Icon from "react-native-vector-icons/FontAwesome";

// SignedOut Screens
import Login from "../Screens/Login";
import Register from "../Screens/Register";
// import WelcomeIcon from "../Screens/WelcomeIcon";

// SignedIn Screens
// import ShoppingCart from "../Screens/ShoppingCart";
import Success from "../Screens/Success";
import Help from "../Screens/Help";

// Async Storage to access stored user details
import AsyncStorage from "@react-native-async-storage/async-storage";

//Bottom Tab Navigator
import Main from "./main";

//Top Tab Navigator
import CheckoutNavigator from "./CheckoutNavigator";

const Stack = createNativeStackNavigator();

function MyStacks() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check if the user is logged in
    const isLoggedIn = async () => {
      try {
        // Replace 'token' with the key you used to store the JWT token during login
        const token = await AsyncStorage.getItem("token");

        if (token) {
          // If the token exists, the user is logged in
          setLoggedIn(true);
        }
      } catch (error) {
        // To Handle any potential errors
        console.error("Error checking login status:", error);
      }
    };

    // Call the function to check login status when the component mounts
    isLoggedIn();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {loggedIn ? (
            // If the user is logged in, show the main app screens
            <> */}
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false, title: "Login" }}
              />
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen
                name="Help"
                component={Help}
                options={{ headerShown: false, title: "Help" }}
              />
              <Stack.Screen
                name="Success"
                component={Success}
                options={{ headerShown: false, title: "Success" }}
              />
              <Stack.Screen
                name="Checkout"
                component={CheckoutNavigator}
                options={{ headerShown: true, title: "Checkout" }}
              />
              {/* <Stack.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{
                  headerShown: true,
                  headerTitleAlign: "center",
                  headerTitleStyle: styles.headerTitle,
                  title: "Cart",
                  headerTitle: () => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name="shopping-cart"
                        style={{ position: "relative" }}
                        size={23}
                        color="#6342E8"
                      />
                      <Text style={styles.headerText}>Cart</Text>
                    </View>
                  ),
                  headerBackVisible: false,
                  gestureEnabled: false,
                }}
              /> */}
            {/* </>
          ) : (
            // If the user is not logged in, show the login screen
            <> */}
              
              {/* <Stack.Screen
                name="Welcome"
                component={WelcomeIcon}
                options={{ headerShown: false, title: "ScanNGo" }}
              /> */}
              
              {/* <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false, title: "Login" }}
              /> */}
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false, title: "Register" }}
              />
            {/* </>
          )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    // flex: 1,
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 5,
  },
});

export default MyStacks;
