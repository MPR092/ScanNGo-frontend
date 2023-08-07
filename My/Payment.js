import React, { useState } from "react";
import { useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

////// Credit Card Data //////
import { Formik } from "formik";
import * as Yup from "yup";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
//////////////////////////////

//Get Cart Items State
import { connect } from "react-redux";

const methods = [
  { name: "Card Payment", value: 1 },
  // { name: 'Interact', value: 2 },
  // { name: 'Cash', value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  //checkout state
  const [orderItems, setOrderItems] = useState();

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
//   console.log("Order: ", order);

  // payment state
  const [selected, setselected] = useState();
  const [card, setCard] = useState();

  //////
  // Handling Credit Card Values
  //////
  const initialValues = {
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  };

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card number is required"),
    expMonth: Yup.string().required("Expiration month is required"),
    expYear: Yup.string().required("Expiration year is required"),
    cvc: Yup.string().required("CVC is required"),
  });

  const USE_LITE_CREDIT_CARD_INPUT = false;

//   const onSubmit = (values) => {
//     console.log(values);
//     // Perform further actions with the credit card data, e.g., make a payment
//   };


  _onChange = formData => {
    console.log(JSON.stringify(formData, null, " "));
  };

  _onFocus = field => {
    console.log(field);
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
        { USE_LITE_CREDIT_CARD_INPUT ? 
        (<LiteCreditCardInput
            onChange = {this._onChange}
            onFocus = {this._onFocus}
        />) : (<CreditCardInput
            requiresName
            requiresCVC
            allowScroll
            onChange = {this._onChange}
            onFocus = {this._onFocus}
            />) 
        }
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
    justifyContent: 'center',
    // padding: 20,
    // backgroundColor: 'white',
  },
});

export default connect(mapStateToProps)(Payment);
