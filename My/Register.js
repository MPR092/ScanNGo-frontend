import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const Register = ({navigation}) => {
  return (
    <View style={styles.register}>
      <View style={[styles.button, styles.buttonLayout]}>
        <Image
          style={[styles.addToCart, styles.logo1Position]}
          contentFit="cover"
          source={require("../assets/add-to-cart.png")}
        />
        <Text style={styles.text}>Register</Text>
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.logo}
          placeholder="Scan N Go"
          keyboardType="default"
          placeholderTextColor="#000"
        />
      </View>
      <TextInput
        style={[styles.container, styles.containerBorder]}
        placeholder="Placeholder text"
        keyboardType="default"
      />
      <View style={[styles.hint, styles.hintPosition]}>
        <Text style={[styles.name, styles.nameTypo]}>Name</Text>
      </View>
      <View style={[styles.hint1, styles.hintFlexBox]} />
      <Text style={[styles.oldUserLogin, styles.nameTypo]}>
        Old User? Login Here
      </Text>
      <TextInput
        style={[styles.container1, styles.containerBorder]}
        placeholder="Placeholder text"
        keyboardType="default"
        secureTextEntry={true}
      />
      <View style={[styles.hint2, styles.hintFlexBox]}>
        <Text style={[styles.name, styles.nameTypo]}>Password</Text>
      </View>
      <View style={[styles.header1, styles.header1Layout]}>
        <View style={[styles.logo1, styles.logo1Position]}>
          <Text style={[styles.scanNGo, styles.nameTypo]}>Scan N Go</Text>
        </View>
        <Image
          style={[styles.dividerIcon, styles.header1Layout]}
          contentFit="cover"
          source={require("../assets/divider.png")}
        />
      </View>
      <TextInput
        style={[styles.container2, styles.containerBorder]}
        placeholder="Placeholder text"
        keyboardType="default"
      />
      <View style={[styles.hint3, styles.hintPosition]}>
        <Text style={[styles.name, styles.nameTypo]}>Email</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    height: 72,
    width: 309,
  },
  logo1Position: {
    top: 0,
    position: "absolute",
  },
  containerBorder: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d2d2d2",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    position: "absolute",
    backgroundColor: Color.white,
  },
  hintPosition: {
    left: 51,
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
  },
  nameTypo: {
    color: Color.dark,
    fontFamily: FontFamily.latoBlack,
    fontWeight: "900",
    textAlign: "left",
  },
  hintFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  header1Layout: {
    width: 352,
    position: "absolute",
  },
  addToCart: {
    left: 0,
    height: 72,
    width: 309,
  },
  text: {
    marginLeft: -40.5,
    top: 27,
    left: "50%",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
    color: Color.white,
    width: 89,
    height: 17,
    textAlign: "left",
    lineHeight: 22,
    position: "absolute",
  },
  button: {
    top: 584,
    left: 52,
    position: "absolute",
    height: 72,
    width: 309,
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
    top: 181,
    left: 108,
    justifyContent: "center",
    width: 205,
    alignItems: "center",
    position: "absolute",
  },
  container: {
    bottom: 530,
    left: 47,
    right: 40,
    height: 48,
    borderWidth: 1,
    borderColor: "#d2d2d2",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
  },
  name: {
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    color: Color.dark,
    lineHeight: 22,
  },
  hint: {
    top: 270,
  },
  hint1: {
    top: 696,
    left: 268,
    overflow: "hidden",
  },
  oldUserLogin: {
    top: 674,
    left: 224,
    display: "flex",
    width: 148,
    height: 33,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    color: Color.dark,
    lineHeight: 22,
    alignItems: "center",
    position: "absolute",
  },
  container1: {
    right: 44,
    bottom: 353,
    left: 43,
  },
  hint2: {
    top: 447,
    left: 47,
    overflow: "hidden",
  },
  scanNGo: {
    fontSize: FontSize.size_5xl,
    lineHeight: 20,
    left: 0,
    top: 0,
    position: "absolute",
  },
  logo1: {
    left: 110,
    width: 112,
    height: 20,
  },
  dividerIcon: {
    top: 31,
    height: 1,
    left: 0,
  },
  header1: {
    top: 54,
    left: 31,
    height: 32,
  },
  container2: {
    bottom: 437,
    left: 47,
    right: 40,
    height: 48,
    borderWidth: 1,
    borderColor: "#d2d2d2",
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
  },
  hint3: {
    top: 363,
  },
  register: {
    borderRadius: Border.br_21xl,
    flex: 1,
    width: "100%",
    height: 875,
    overflow: "hidden",
    backgroundColor: Color.white,
  },
});

export default Register;
