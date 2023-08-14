import React, { useState } from "react";
import { useEffect } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

////// Credit Card Data //////
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
//////////////////////////////

//ignore the logging errors in runtime
import { LogBox } from "react-native";

//Ignore all logs (warning)
// These are bugs from the library and not yet solved
LogBox.ignoreLogs(['ABI49_0_0RCTUIManager.measureLayoutRelativeToParent method is deprecated and it will not be implemented in newer versions of ABI49_0_0RN (Fabric) - T47686450']);
LogBox.ignoreLogs(['fontFamily "Courier" is not a system font and has not been loaded through Font.loadAsync.']);
LogBox.ignoreLogs(['Failed prop type: CCInput']);
// LogBox.ignoreAllLogs(true);

//Get Cart Items State
import { connect } from "react-redux";

// const methods = [
//   { name: "Card Payment", value: 1 },
//   // { name: 'Interact', value: 2 },
//   // { name: 'Cash', value: 3 },
// ];

// const paymentCards = [
//   { name: "Wallet", value: 1 },
//   { name: "Visa", value: 2 },
//   { name: "MasterCard", value: 3 },
//   { name: "Other", value: 4 },
// ];

const Payment = (props) => {
  //checkout state
  const [orderItems, setOrderItems] = useState();

  // State to track the validity of the credit card form
  const [isFormValid, setIsFormValid] = useState(false);

  const checkOut = () => {
    let order = {
      orderItems: props.cartItems,
      date: Date.now(),
    };

    // props.navigation.navigate('Payment', {order: order} )
    return order;
  };

  // const order = props.route.params;
  const order = checkOut();
  // console.log("Order: ", order);

  // payment state
  const [selected, setselected] = useState();
  const [card, setCard] = useState();

  //////
  // Handling Credit Card Values
  //////

  const USE_LITE_CREDIT_CARD_INPUT = false;

  // const handleContinue = () => {
  //   console.log("Continue Pressed");
  //   props.navigation.navigate('Confirm');
  // };


  _onChange = (formData) => {
    // console.log(JSON.stringify(formData, null, " "));
    setCard(formData.values);
    // console.log(card)
    // Check if the form is valid and set the state accordingly
    setIsFormValid(formData.valid);
  };

  _onFocus = (field) => {
    // console.log(field);
  };

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  return (
    <>
      <KeyboardAwareScrollView style={styles.structure}>
        <View style={styles.container}>
          {USE_LITE_CREDIT_CARD_INPUT ? (
            <LiteCreditCardInput
              onChange={this._onChange}
              onFocus={this._onFocus}
            />
          ) : (
            <CreditCardInput
              requiresName
              requiresCVC
              // allowScroll
              onChange={this._onChange}
              onFocus={this._onFocus}
            />
          )}
        </View>
        <View style={styles.footer}>
          {/* <TouchableOpacity style={styles.button2} onPress={() => props.navigation.navigate('Confirm', { order, card }) }> */}
          <TouchableOpacity
          style={[
            styles.button2,
            { backgroundColor: isFormValid ? "#6342E8" : "#cccccc" }, // Change button color based on form validity
          ]}
          onPress={() =>
            isFormValid &&
            props.navigation.navigate("Confirm", { order, card })
          }
          disabled={!isFormValid} // Disable the button if the form is not valid
        >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    </>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  structure: {
    flex: 1,
    paddingTop: 40,
    // backgroundColor: "#b5babd",
  },
  container: {
    flex: 1,
    flexDirection: "column", // Display input fields in a column
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'center,'
    // padding: 20,
    // backgroundColor: 'white',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    // backgroundColor: 'red',
  },
  button2: {
    flex: 1,
    // flexDirection: 'row',
    flexDirection: 'column',
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
});

export default connect(mapStateToProps)(Payment);
