import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const WelcomeIcon = () => {
  return (
    <ImageBackground
      style={styles.welcomeIcon}
      resizeMode="cover"
      source={require("../assets/welcome.png")}
    >
      <Image
        style={styles.shoppingBagIcon}
        contentFit="cover"
        source={require("../assets/shoppingbag.png")}
      />
      <Image
        style={styles.vectorEffectsIcon}
        contentFit="cover"
        source={require("../assets/vector-effects.png")}
      />
      <View style={styles.header}>
        <Image
          style={styles.takeAPhotoIcon}
          contentFit="cover"
          source={require("../assets/take-a-photo-icon1.png")}
        />
        <Text
          style={styles.logo}
          >
            Scan N Go
        </Text>
      </View>
      <View style={styles.introText}>
        <Text style={styles.whyNotJustTypo}>Still waiting in lines ?{'\n'}why not just</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  whyNotJustTypo: {
    textAlign: "center",
    color: Color.dark,
    lineHeight: 24,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.latoBlack,
    fontWeight: "900",
  },
  vectorEffectsIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    top: 0,
    left: 0,
    marginTop: 60,
    marginBottom: 80,
    // paddingTop: 150,
    // width: 944,
    // height: 1676,
    width: '100%',
    height: '100%',
    // position: "absolute",
    position: 'relative'
  },
  logo: {
    fontSize: FontSize.size_25xl,
    fontFamily: FontFamily.latoBlack,
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
    width: 205,
  },
  header: {
    top: 418,
    left: 104,
    justifyContent: "center",
    width: 205,
    alignItems: "center",
    position: "absolute",
  },
  takeAPhotoIcon: {
    marginTop: -64.25,
    marginLeft: -17.75,
    top: "50%",
    left: "50%",
    width: 36,
    height: 31,
    position: "absolute",
  },
  whyNotJust: {
    marginTop: 13,
  },
  introText: {
    top: 298,
    left: 99,
    width: 224,
    alignItems: "center",
    position: "absolute",
  },
  shoppingBagIcon: {
    height: "6.29%",
    width: "12.8%",
    top: "24.69%",
    right: "77.54%",
    bottom: "69.03%",
    left: "9.66%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  welcomeIcon: {
    borderRadius: Border.br_21xl,
    flex: 1,
    width: "100%",
    height: 875,
    overflow: "hidden",
  },
});

export default WelcomeIcon;
