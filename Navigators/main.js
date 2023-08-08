import React, { useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

//icons
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//redux
import { connect } from "react-redux";

// Access admin data stored before (replace with your logic)
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode';

//screens
import ShoppingCart from "../Screens/ShoppingCart";
import UserProfile from "../Screens/userProfile";
// import CartIcon from "../Shared/cartIcon";
import AdminPage from '../Screens/AdminPage'
import { useEffect } from "react";


// const checkIsAdmin = async () => {
//   // const token = await AsyncStorage.getItem('token');
//   // const decodedToken = jwtDecode(token);
//   // console.log(decodedToken);
//   // return(decodedToken.isAdmin);
//   const user = JSON.parse(await AsyncStorage.getItem('USER'));
  
//   console.log(user);
//   return user;
// }

const Tab = createBottomTabNavigator();

const Main = (props) => {
  // const user = JSON.parse(await AsyncStorage.getItem('USER'));
  // console.log(user.isAdmin);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#6342E8",
        tabBarInactiveTintColor: "grey",
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Cart"
    >
      <Tab.Screen
        name="Cart"
        component={ShoppingCart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),

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
                // color="#6342E8"
              />
              <Text style={styles.headerText}>Cart</Text>
            </View>
          ),

          tabBarLabel: "Cart", // Custom label for the tab
          tabBarBadge: props.cartItems.length ? props.cartItems.length : null, // Display a badge on the tab
          // tabBarBadgeStyle: { backgroundColor: 'red' }, // Style the badge background
        }}
      />
      <Tab.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
          tabBarLabel: "User Profile", // Custom label for the tab
        }}
      />
      {/* { user.isAdmin ? ( */}
        <Tab.Screen
          name="Admin"
          component={AdminPage}
          options={{
          tabBarIcon: ({ color, size }) => (
              <Icon name="cog" size={size} color={color} />
            ),
            tabBarLabel: 'Admin', // Custom label for the tab
          }}
        />
      {/* ) : null } */}
      
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

// export default Main;

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

export default connect(mapStateToProps)(Main);
