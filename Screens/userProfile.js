import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";

//Icons
import Icon from "react-native-vector-icons/FontAwesome";

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
      <Icon
        name="faCircleUser"
        size={36}
        color="#6342E8"
        style={styles.profileIcon}
      />

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
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userIcon: {
    width: 100,
    height: 100,
    // borderRadius: 50,
    marginBottom: 20,
  },
  emailIcon: {
    width: 100,
    height: 100,
    // borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    // fontSize: FontSize.size_l,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userEmail: {
    // fontSize: FontSize.size_m,
    color: Color.darkgray,
    marginBottom: 20,
  },
  creditCardContainer: {
    backgroundColor: Color.gray,
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  creditCardLabel: {
    // fontSize: FontSize.size_s,
    fontWeight: "bold",
    marginBottom: 5,
  },
  creditCardNumber: {
    // fontSize: FontSize.size_m,
  },
});

export default UserProfile;
