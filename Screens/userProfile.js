// import * as React from "react";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

//access user data stored before
import AsyncStorage from "@react-native-async-storage/async-storage";

//Icons
import Icon from "react-native-vector-icons/FontAwesome";
// import { Avatar } from "@react-native-material/core";
// import Icon1 from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";

const UserProfile = (props) => {
  const [USER, setUSER] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    // event.preventDefault();
    try {
      // Clear AsyncStorage data
      await AsyncStorage.clear();
      // await AsyncStorage.removeItem('USER');
      // await AsyncStorage.removeItem('token');
      // Reset the USER state to null
      setUSER("");

      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Logout Successful",
        text2: "Thank you for choosing ScanNGo",
      });

      // Additional logout logic ( navigating to the login screen)
      // props.navigation.navigate("Cart");
      props.navigation.navigate("Login");
    } catch (error) {
      // Handle error if necessary
      console.log("Error while logging out:", error);
    }
  };


  useEffect(() => {
   let unsubscribe=props.navigation.addListener("focus",async()=>{
    const user = JSON.parse(await AsyncStorage.getItem("USER"));
    // console.log("Fetched user data:", user);
    setUSER(user);
    setIsLoading(false);
    setLoading(false);
   })

   return unsubscribe;
    // const fetchUSERData = async () => {
    //   try {
       
    //     // Set loading to false once data is fetched
    //   } catch (error) {
    //     console.error("Error fetching user data: ", error);
    //     // setIsLoading(false); // Set loading to false even if there's an error
    //   }
    // };

    // fetchUSERData();
  }, []);

  // Show loading message while fetching data
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
// console.log("USER",USER)
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Icon */}
      <View style={styles.header}>
        <FontAwesome5
          name="user-circle"
          size={50}
          style={styles.profileIcon}
          color="#6342E8"
        />
        <Text style={styles.profileIconText}>User Profile</Text>
      </View>

      {loading == false ? (
        
        <View style={styles.body}>
          {/* User Name */}
          {/* {USER?.name && ( // Check if USER.name is available */}
          <View style={styles.bodyText}>
            <Icon
              name="user"
              size={20}
              color="#6342E8"
              style={styles.userIcon}
            />
            {/* <Text style={styles.userName}>{userData.name}</Text> */}
            <Text style={styles.userName}>{USER?.name}</Text>
          </View>
          {/* )} */}

          {/* User Email */}
          {/* {USER?.email && ( // Check if USER.email is available */}
          <View style={styles.bodyText}>
            <Icon
              name="envelope"
              size={20}
              color="#6342E8"
              style={styles.emailIcon}
            />
            {/* <Text style={styles.userEmail}>{userData.email}</Text> */}
            <Text style={styles.userEmail}>{USER?.email}</Text>
          </View>
          {/* )} */}

          {/* Credit Card Details */}
          {/* <View style={styles.creditCardContainer}>
        <Text style={styles.creditCardLabel}>Credit Card:</Text>
        <Text style={styles.creditCardNumber}>{userData.creditCard}</Text>
      </View> */}
        </View>
 
      ) : (
        <>
        <View style={[ styles.center, { backgroundColor: '#f2f2f2'} ]}>
          <ActivityIndicator size='large' color='red' />
        </View>
        </>
        // Loading
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            handleLogout();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
  center: {
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1.5,
    // borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
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
  footer: {
    flex: 1,
    // padding: 60,
    // margin: 50
  },
  button2: {
    flex: 0,
    backgroundColor: "#6342E8",
    borderRadius: 10,
    paddingVertical: 12,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bodyText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderRadius: 15,
    paddingVertical: 10,
    margin: 1,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    elevation: 20,
  },
});

export default UserProfile;
