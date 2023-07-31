import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// SignedIn Screens
import ShoppingCart from "../Screens/ShoppingCart";
import Success from "../Screens/Success";
import Help from "../Screens/Help";

const MySignedInStack = createNativeStackNavigator();


function SignedInStack() {
  return (
    <NavigationContainer>
      {/* <MySignedInStack.Navigator
        initialRouteName="ShoppingCart"
        screenOptions={{
          headerShown: true,
          title: "Cart",
        }}
      > */}
        <MySignedInStack.Screen
            name="Help"
            component={Help}
            options={{ headerShown: false, title: "Help" }}
          />
          <MySignedInStack.Screen
            name="Success"
            component={Success}
            options={{ headerShown: true, title: "Checkout" }}
          />
          <MySignedInStack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{ headerShown: true, title: "Cart", headerBackVisible: false , gestureEnabled: false }}
          />
      {/* </MySignedInStack.Navigator> */}
    </NavigationContainer>
  );
}

export default SignedInStack;