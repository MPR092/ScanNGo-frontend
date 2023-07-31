// import * as React from "react";
import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";

//access user data stored before
import AsyncStorage from "@react-native-async-storage/async-storage";

//Icons
import Icon from "react-native-vector-icons/FontAwesome";
// import { Avatar } from "@react-native-material/core";
// import Icon1 from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';

const UserProfile = () => {
  const [USER, setUSER] = useState(null);

  // Sample user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    creditCard: "**** **** **** 1234",
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage
    const fetchUSERData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('USER'));
        setUSER(user);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUSERData();
  }, []);

  // Show loading or error message while fetching data
  if (userData === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Icon */}
      <FontAwesome5 name="user-circle" size={50} style={styles.profileIcon} color="#6342E8" />
      <Text style={styles.profileIconText} >User Profile</Text>

      {/* User Name */}
      {USER?.name && ( // Check if USER.name is available
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="user"
          size={20}
          color="#6342E8"
          style={styles.userIcon}
        />
        {/* <Text style={styles.userName}>{userData.name}</Text> */}
        <Text style={styles.userName}>{USER.name}</Text>
      </View>
      )}

      {/* User Email */}
      {USER?.email && ( // Check if USER.email is available
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="envelope"
          size={20}
          color="#6342E8"
          style={styles.emailIcon}
        />
        {/* <Text style={styles.userEmail}>{userData.email}</Text> */}
        <Text style={styles.userEmail}>{USER.email}</Text>
      </View>
      )}

      {/* Credit Card Details */}
      <View style={styles.creditCardContainer}>
        <Text style={styles.creditCardLabel}>Credit Card:</Text>
        <Text style={styles.creditCardNumber}>{userData.creditCard}</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 20, // Add some horizontal padding for better spacing
  },
  profileIcon: {
    fontSize: 50,
    color: "#6342E8", // Assuming this is the profile icon color
    marginBottom: 10,
  },
  profileIconText: {
    fontSize: 30,
    marginBottom: 20,
  },
  userIcon: {
    flex: 2,
    textAlign: "center",
    // alignSelf: 'flex-end',
    // marginRight: 10, // Add some space between icon and text
  },
  emailIcon: {
    flex: 2,
    textAlign: "center",
    // marginRight: 10, // Add some space between icon and text
  },
  userName: {
    flex: 5,
    textAlign: "center", // Align text to the right
    fontWeight: "bold",
    // flex: 1, // Allow the text to expand to the right
  },
  userEmail: {
    flex: 5, // Allow the text to expand to the right
    textAlign: "center", // Align text to the right
    // fontSize: FontSize.size_m, // If FontSize.size_m is defined elsewhere, you can uncomment this line
    // color: Color.darkgray, // If Color.darkgray is defined elsewhere, you can uncomment this line
    // marginBottom: 20,
  },
  creditCardContainer: {
    flexDirection: "row", // Display label and number side by side
    justifyContent: "flex-end", // Align the whole credit card section to the right
    alignItems: "center", // Align items to the center vertically
    marginTop: 20, // Add some space between the sections
    backgroundColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    width: "60%",
  },
  creditCardLabel: {
    marginRight: 10, // Add some space between label and number
    fontWeight: "bold",
    // fontSize: FontSize.size_s, // If FontSize.size_s is defined elsewhere, you can uncomment this line
    // marginBottom: 5,
  },
  creditCardNumber: {
    textAlign: "right", // Align text to the right
    // fontSize: FontSize.size_m, // If FontSize.size_m is defined elsewhere, you can uncomment this line
  },
});

export default UserProfile;
