import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

//icons
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//screens
import ShoppingCart from "../Screens/ShoppingCart";
import UserProfile from "../Screens/userProfile";
// import Admin from '../Screens/admin'

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#6342E8",
        tabBarInactiveTintColor: "grey",
        tabBarHideOnKeyboard: true,
      }}
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

          tabBarLabel: 'Cart', // Custom label for the tab
          // tabBarBadge: 3, // Display a badge on the tab
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
      {/* <Tab.Screen
        name="Admin"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
          tabBarLabel: 'Admin', // Custom label for the tab
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Main;

{
  /* <Tab.Navigator
      initialRouteName="Cart"
      // screenOptions={{ headerShown: true }}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        // showLabel: true,
        showLabel: false,
        activeTintColor: "#6342E8",
        // tabBarLabel: 'Rocket Screen', // Custom label for the tab
        // tabBarBadge: 3, // Display a badge on the tab
        // tabBarBadgeStyle: { backgroundColor: 'red' }, // Style the badge background
      }}
      // options={{
      //   tabBarIcon: ({ color, size }) => (
      //     <FontAwesome5 name="shopping-cart" size={24} color="black" />
      //   ),
      //   // showLabel: true,
      //   showLabel: false,
      //   // tabBarLabel: 'Rocket Screen', // Custom label for the tab
      //   // tabBarBadge: 3, // Display a badge on the tab
      //   // tabBarBadgeStyle: { backgroundColor: 'red' }, // Style the badge background
      // }}
    >
      <Tab.Screen
        name="Cart"
        component={ShoppingCart}
        screenOptions={{
          tabBarIcon: ({ color }) => {
            <MaterialCommunityIcons name="cart" size={50} color="black" />
          },
        }}
      />
      <Tab.Screen 
        name="Admin"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => {
            <FontAwesome name="user" size={24} color="black" />
            // <Icon
            //   name='cog'
            //   style={{ position: 'relative'}}
            //   // color='#3A3B3C'
            //   color={color}
            //   size={30}
            // />
          }
        }} 
      />
      <Tab.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => {
            <Icon
              name="user"
              style={{ position: "relative" }}
              color="#3A3B3C"
              // color={color}
              size={30}
            />;
          },
        }}
      />
    </Tab.Navigator> */
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