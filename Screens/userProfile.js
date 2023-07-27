import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";

//Icons
import Icon from "react-native-vector-icons/FontAwesome";
// import { Avatar } from "@react-native-material/core";
// import Icon1 from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';

const UserProfile = () => {
  // Sample user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    creditCard: "**** **** **** 1234",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Icon */}
      <FontAwesome5 name="user-circle" size={50} style={styles.profileIcon} color="#6342E8" />
      <Text style={styles.profileIconText} >User Profile</Text>

      {/* User Name */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="user"
          size={20}
          color="#6342E8"
          style={styles.userIcon}
        />
        <Text style={styles.userName}>{userData.name}</Text>
      </View>

      {/* User Email */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="envelope"
          size={20}
          color="#6342E8"
          style={styles.emailIcon}
        />
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

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
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: 'blue',
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileIcon: {
//     fontSize: 30,
//     // width: 100,
//     // height: 100,
//     // borderRadius: 50,
//     // marginBottom: 20,
//   },
//   profileIcon: {
//     // size: '56'
//     // fontSize: 30,
//     // width: 100,
//     // height: 100,
//     // borderRadius: 50,
//     // marginBottom: 20,
//   },
//   profileIconText: {
//     fontSize: 30,
//     // width: 100,
//     // height: 100,
//     // borderRadius: 50,
//     // marginBottom: 20,
//   },
//   userIcon: {
//     // width: 100,
//     // height: 100,
//     // borderRadius: 50,
//     // marginBottom: 20,
//   },
//   emailIcon: {
//     alignSelf: 'stretch',
//     // width: 100,
//     // height: 100,
//     // borderRadius: 50,
//     // marginBottom: 20,
//   },
//   userName: {
//     // fontSize: FontSize.size_l,
//     fontWeight: "bold",
//     // marginBottom: 10,
//   },
//   userEmail: {
//     // fontSize: FontSize.size_m,
//     // color: Color.darkgray,
//     // marginBottom: 20,
//   },
//   creditCardContainer: {
//     // flex: 0,
//     backgroundColor: 'grey',
//     // padding: 15,
//     borderRadius: 10,
//     width: "60%",
//     alignItems: "center",
//   },
//   creditCardLabel: {
//     // fontSize: FontSize.size_s,
//     fontWeight: "bold",
//     // marginBottom: 5,
//   },
//   creditCardNumber: {
//     // fontSize: FontSize.size_m,
//   },
// });

export default UserProfile;
