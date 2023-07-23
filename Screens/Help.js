import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
// import { Button } from "@ui-kitten/components";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const Help = () => {
  return (
    <SafeAreaView style={styles.help}>

      <View style={styles.containerHeader}>
        <Text style={styles.title}>Help</Text>
        <View style={styles.underlineContainer}>
          <View style={styles.underline} />
        </View>
      </View>
      
      <View style={styles.body}>

      <View style={styles.scanComponentcodeean13Parent}>
        <Image
          style={styles.scanComponentcodeean13Icon}
          // resizeMode="cover"
          contentFit="cover"
          // contentFit="absolute"
          source={require("../assets/images/scan-componentcodeean13.png")}
        />
        <View style={[styles.codeContainer, styles.logoPosition]}>
          <Text style={[styles.text, styles.textPosition]}>
            This is an example of a bar code that you can find on the product.
          </Text>
        </View>
      </View>

      <View style={styles.codebig}>
        <Image
          style={styles.helpChild}
          contentFit="cover"
          // contentFit="relative"
          source={require("../assets/images/group-6872.png")}
        />
      </View>

      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoPosition: {
    top: 0,
    position: "absolute",
  },
  textPosition: {
    textAlign: "left",
    color: Color.dark,
    top: 0,
    position: "absolute",
  },
  headerLayout: {
    width: 352,
    position: "absolute",
  },
  helpChild: {
    top: 150,
    // left: 17,
    width: 380,
    height: 473,
    // position: "absolute",
    // position: "relative",
  },
  scanComponentcodeean13Icon: {
    top: 50,
    left: 98,
    width: 173,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
  },
  text: {
    marginLeft: -141.5,
    left: "50%",
    fontSize: FontSize.size_mini,
    lineHeight: 22,
    fontFamily: FontFamily.interRegular,
    width: 307,
    height: 64,
  },
  codeContainer: {
    height: 50,
    left: 0,
    width: 375,
    overflow: "hidden",
  },
  scanComponentcodeean13Parent: {
    flex: 1,
    // top: 126,
    // left: 20,
    height: 133,
    width: 375,
    position: "absolute",
    // backgroundColor: 'red',
  },
  scanNGo: {
    fontSize: FontSize.size_5xl,
    lineHeight: 20,
    fontWeight: "900",
    fontFamily: FontFamily.latoBlack,
    left: 0,
  },
  logo: {
    left: 150,
    width: 51,
    height: 20,
  },
  dividerIcon: {
    top: 33,
    height: 1,
    left: 0,
  },
  systemStatusoutlinequestiIcon: {
    top: 2,
    left: 126,
    width: 18,
    height: 18,
    position: "absolute",
  },
  header: {
    top: 51,
    left: 31,
    height: 34,
  },
  generalfillcloseIcon: {
    top: 46,
    left: 50,
    width: 32,
    height: 35,
    position: "absolute",
  },
  help: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 875,
    overflow: "hidden",
  },
  containerHeader: {
    // width: "100%",
    alignItems: "center",
    paddingBottom: 10,
    // flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  underlineContainer: {
    flex: 1,
    flexDirection: "row",
  },
  underline: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
    marginTop: 5,
    // flex: 1,
    // flexDirection: 'row',
  },
  body: {
    flex: 1,
    margin: 2,
    // padding: 59,
    // backgroundColor: 'red',
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  codebig: {
    flex: 3,
    // backgroundColor: 'blue',
    // alignSelf: 'flex-end',
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

export default Help;
