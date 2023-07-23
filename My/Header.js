import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>ScanNGo</Text>
        <View style={styles.underlineContainer}>
          <View style={styles.underline} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: 'blue',
    alignItems: "center",
    //paddingTop: 20,
    paddingBottom: 10,
    //   flex: 1,
    //   flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  underline: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
    marginTop: 5,
    // flex: 1,
    // flexDirection: 'row',
  },
  underlineContainer: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Header;