import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, SafeAreaView, TouchableOpacity } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Success = ({navigation}) => {

  // const { totalP } = route.params;

  // if ( totalP ) {


    // Toast.show({
    //   topOffset: 60,
    //   type: "success",
    //   text1: "Payment Successful",
    //   text2: "Shop with us again"
    // })


  // }

  const handleContinue = () => {
    // event.preventDefault();
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Logout Successful",
      text2: "Try to login again"
    })
  }

  return (
    <SafeAreaView style={styles.container}>
    
      {/* <View style={styles.containerHeader}>
        <Text style={styles.title}>ScanNGo</Text>
        <View style={styles.underlineContainer}>
          <View style={styles.underline} />
        </View>
      </View> */}

      <View style={styles.body}>
        {/* <Text style={styles.paid}>$ {JSON.stringify(totalP)}</Text> */}
        <Image
          style={styles.successChild}
          contentFit="cover"
          source={require("../assets/images/group-167.png")}
        />
        <Text style={styles.thankYou}>{`Thank you for choosing \n Scan N Go`}</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button2} onPress={() => { navigation.navigate("Login"); handleContinue()} }>
          <Text style={styles.buttonText}>Continue shopping</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    // flex: 1,
    // width: "100%",
    alignItems: "center",
    paddingBottom: 10,
    // flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerLayout: {
    width: 352,
    position: "absolute",
  },
  // scanNGoTypo: {
  //   textAlign: "left",
  //   fontFamily: FontFamily.latoBlack,
  //   fontWeight: "900",
  //   position: "absolute",
  // },
  continueLayout: {
    height: 54,
    width: 316,
    position: "absolute",
  },
  dividerIcon: {
    top: 31,
    height: 1,
    left: 0,
  },
  systemStatusoutlinequestiIcon: {
    left: 126,
    width: 18,
    height: 18,
    top: 0,
    position: "absolute",
  },
  scanNGo: {
    left: 120,
    lineHeight: 20,
    color: Color.dark,
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    top: 0,
  },
  header1: {
    top: 53,
    left: 31,
    height: 32,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 4,
    // backgroundColor: 'blue'
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    flex: 1,
    // padding: 60,
    // margin: 50
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
  continueChild: {
    borderRadius: Border.br_37xl,
    top: 0,
    left: 0,
  },
  continueShopping: {
    top: 8,
    left: 101,
    fontSize: FontSize.size_2xs,
    lineHeight: 37,
    textTransform: "uppercase",
    color: Color.white,
  },
  continue: {
    top: 714,
    left: 49,
  },
  thankYou: {
    top: 450,
    // left: 91,
    color: Color.gray,
    textAlign: "center",
    // fontFamily: FontFamily.latoBlack,
    fontWeight: "900",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  successChild: {
    alignSelf: 'center',
    // alignContent: 'center',
    // margin: 30,
    // padding: 60,
    // height: "28.63%",
    height: "50%",
    // width: "67.73%",
    width: "70%",
    // top: "18.97%",
    // top: "15%",
    // right: "16.09%",
    // right: "15%",
    // bottom: "52.39%",
    // bottom: "52.39%",
    // left: "16.18%",
    // left: "15%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  success: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 875,
    overflow: "hidden",
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
  paid: {
    // top: 50,
    // left: 91,
    // color: Color.gray,
    textAlign: "center",
    fontFamily: FontFamily.latoBlack,
    fontWeight: "900",
    fontSize: FontSize.size_5xl,
    // position: "absolute",
  },
});

export default Success;
