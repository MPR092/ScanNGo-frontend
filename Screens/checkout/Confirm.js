import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

//for sending email
import emailjs from '@emailjs/browser';

//db connect
import baseURL from '../../assets/common/BaseUrl'
import axios from 'axios';

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

//Get Redux State
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Email Content
const generateEmailContent = (orderData, cardNumber) => {
  // Create a new Date object using the timestamp
  const date = new Date(orderData.date);

  // Format the date and time to English format
  const options = { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // timeZoneName: 'short'
  };

  const englishDateTime = date.toLocaleString('en-US', options);

  // Helper function to calculate the total price
  var total = 0;
  var totalP = 0;
  orderData.orderItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  const lastFourDigits = cardNumber.slice(-4);
  const hiddenCardNumber = '*'.repeat(cardNumber.length - 4) + lastFourDigits;

  //Total to 2 decimal
  totalP = total.toFixed(2);

  const emailContent = `
  <h4 style="font-family: Arial, sans-serif;">Thank you for shopping with us</h4>
  <h3 style="font-family: Arial, sans-serif; text-align: center;">ScanNGo - Order Receipt</h3>
  <p style="font-family: Arial, sans-serif;">Card Number: ${hiddenCardNumber}</p>
  <p style="font-family: Arial, sans-serif;">Time: ${englishDateTime}</p>
  <h4 style="font-family: Arial, sans-serif; text-align: center; ">Order Items:</h4>
  <table style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
      <tr>
          <th style="background-color: #f2f2f2; text-align: center; padding: 8px; font-family: Arial, sans-serif;">Product</th>
          <th style="background-color: #f2f2f2; text-align: center; padding: 8px; font-family: Arial, sans-serif;">UPC</th>
          <th style="background-color: #f2f2f2; text-align: center; padding: 8px; font-family: Arial, sans-serif;">Price</th>
      </tr>
      ${orderData.orderItems.map( (item) => `
                  <tr>
                      <td style="font-family: Arial, sans-serif; text-align: center; padding: 8px;">${item.product.name}</td>
                      <td style="font-family: Arial, sans-serif; text-align: center; padding: 8px;">${item.product.upc}</td>
                      <td style="font-family: Arial, sans-serif; text-align: center; padding: 8px;">$${item.product.price}</td>
                  </tr>
              `
          ).join('')}
      <tr>
          <td style="font-family: Arial, sans-serif; text-align: center; padding: 8px;" colspan="2"><strong>Total</strong></td>
          <td style="font-family: Arial, sans-serif; text-align: center; padding: 8px;"><strong>$${totalP}</strong></td>
      </tr>
  </table>
  <h4 style="font-family: Arial, sans-serif;">Thank you for being our valued customer</h4>
  `;
  return emailContent;
};

//Send Email
const sendEmail = async (toEmail, subject, htmlContent) => {
  const publicKey = 'P8bYpwh0vZ9ebnBqh'; // Email.js User ID
  const serviceID = 'service_d6owzon'; // Email.js service ID
  const accessToken = 'OAodSWvF7AE99PAO-XNa2'; // Email.js access token

  const emailData = {
    from_name: 'ScanNGo',
    to_email: toEmail,
    subject: subject,
    my_html: htmlContent,
  };

  try {
    const response = await emailjs.send(serviceID, 'template_49lhkm6', emailData, publicKey, accessToken);
    console.log('Email sent successfully:', response);
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Receipt sent to your email",
      text2: "Check your email inbox",
    });
  } catch (error) {
    console.error('Error sending email:', error);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Error sending email!",
      text2: `${error}`,
    });
  }
};

const Confirm = (props) => {
  const [token, setToken] = useState("");
  const [USER, setUSER] = useState("");

  //to disable button until info is available
  const [cardDetailsAvailable, setCardDetailsAvailable] = useState(false);
  
  // `useEffect` that fetches user data
  useEffect(() => {
    let unsubscribe=props.navigation.addListener("focus",async()=>{
     const user = JSON.parse(await AsyncStorage.getItem("USER"));
     // console.log("Fetched user data:", user);
     setUSER(user);
    })
 
    return unsubscribe;
  }, []);
  
  // `useEffect` that fetches user token
  useEffect(() => {

    //get token
    AsyncStorage.getItem('token')
    .then((res) => {
      setToken(res)
    })
    .catch((error) => console.log(error))
  }, [])

    const finalOrder = props.route.params;
    
    const cardDetails = props.route.params;
    // console.log(cardDetails);

    // `useEffect` that checks card is available or not
    useEffect(() => {
      // Set the state to indicate the presence of cardDetails
      if (finalOrder?.card) {
        setCardDetailsAvailable(true);
      }
    }, [finalOrder?.card]);

    const confirmOrder = async () => {

      //to append jwt token to the api
    const config = {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${token}`
      }
    }

        //server connect
        console.log("Order Confirmed");
        const order = finalOrder.order;
        // console.log(finalOrder)

        axios
        .post(`${baseURL}/orders/`, order, config)
        .then((res) => {
          // console.log(res);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Order Completed",
              text2: "",
            });
            setTimeout( () => {
              props.clearCart();
              // props.navigation.navigate('Cart');
              props.navigation.navigate('Success');
          }, 500)
          console.log("Order Upload Successfull");
          // console.log("Final Order: ",finalOrder.order);
          // console.log("Card Number: ",finalOrder.card.number);
          
          //...
          const emailContent = generateEmailContent(finalOrder.order, finalOrder.card.number);
          // sendEmail('pirzadahasan98@gmail.com', 'Order Receipt ScanNGo', emailContent);
          // console.log("Email: ", USER.email);
          sendEmail(`${USER?.email}`, 'Order Receipt ScanNGo', emailContent);
          //...
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        })
        
    }

  // const confirm = props.route.params;
  // console.log(confirm.order.orderItems[0]);

  //rendering data
  const renderItem = ({ item }) => {
    return (
    <View style={styles.data}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 1, flexDirection: "row", elevation: 20 }}>
          <View style={styles.item1}>
            <Text style={styles.textName}>{item.product.name}</Text>
            <Text style={styles.textUpc}>{item.product.upc}</Text>
          </View>

          <View style={styles.itemQty}>
            <Text style={styles.textQty}>Qty: 1</Text>
          </View>

          <View style={styles.item3}>
            <Text style={styles.textPrice}>$ {item.product.price}</Text>
          </View>

        </View>
      </View>
    </View>
    )
  }

  return (
    <SafeAreaView style={styles.structure}>
      <View style={styles.container}>
        <Text style={styles.confirmText}>Confirm Order</Text>
      </View>
      {props.route.params ? (
        <>
        <View style={styles.container1}>
        <Text style={styles.confirmCardCard}>Card:</Text>
        <Text style={styles.confirmCard}>{finalOrder.card.number}</Text>
      </View>
        <View style={styles.bodyView}>
          <Text style={styles.bodyItemsText}>Items:</Text>
          <View
            style={{
              flex: 10,
              flexDirection: "row",
            //  paddingVertical: 10,
            //  backgroundColor: "#D3D3D3",
            //  backgroundColor: "#b5babd",
            }}
          >
            <FlatList
              legacyImplementation="true"
              data={finalOrder.order.orderItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>
        </View>
        </>
      ) : null}
      <View style={styles.footer}>
          {/* <TouchableOpacity style={styles.button2} onPress={() => confirmOrder()}> */}
          <TouchableOpacity
            style={[
              styles.button2,
              { backgroundColor: !cardDetailsAvailable ? '#ccc' : '#6342E8' }, // Change background color based on cartItems length
            ]}
            onPress={() => confirmOrder()}
            disabled={!cardDetailsAvailable} // Disable if cardDetails are not available
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  structure: {
    flex: 1,
    paddingTop: 40,
    //   backgroundColor: "#b5babd",
  },
  container: {
    flex: 1,
    flexDirection: 'row', // Display input fields in a column
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'center,'
    // padding: 20,
    // backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    flexDirection: 'row', // Display input fields in a column
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'center,'
    // padding: 20,
    // backgroundColor: 'white',
  },
  body: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    // backgroundColor: 'red',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    // backgroundColor: 'red',
  },
  confirmText: {
    // color: "#6342E8",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmCardCard: {
    // color: "#6342E8",
    // fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center",
  },
  confirmCard: {
    color: "#6342E8",
    // fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center",
  },
  button2: {
    flex: 1,
    // flexDirection: 'row',
    flexDirection: "column",
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
  bodyView: {
    flex: 6,
    // flexDirection: 'column',
    // flexDirection: 'row',
    borderWidth: 0.2,
    borderRadius: 15,
    paddingVertical: 10,
    margin: 10,
    marginHorizontal: 15,
    // paddingHorizontal: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
  },
  bodyItemsText: {
    flex: 1,
    // color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  data: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: 10,
    paddingHorizontal: 5,
    // paddingVertical: 5,
    flex: 1,
    flexDirection: "row",
    // backgroundColor: 'blue',
  },
  itemContainerHighlighted: {
    flex: 1,
    // backgroundColor: "#D3D3D3",
    backgroundColor: "white",
    // borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    // backgroundColor: 'blue',
    borderColor: 'blue',
  },
  itemTotal: {
    flex: 1,
    // left: 100,
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: 20,
  },
  textName: {
    color: "#6342E8",
  },
  textQty: {
    color: "#000000",
  },
  item1: {
    flex: 2,
    alignSelf: "left",
    padding: 10,
  },
  textUpc: {
    color: "grey",
  },
  item2: {
    flex: 2,
    alignSelf: "left",
    padding: 10,
  },
  textPrice: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },
  item3: {
    flex: 1,
    // flexDirection: 'column',
    // backgroundColor: 'red',
    alignSelf: "center",
    justifyContent: "flex-end",
    // padding: 10
  },
  itemQty: {
    flex: 1,
    alignSelf: "flex-end",
    paddingBottom: 7,
  },
  itemContainer: {
    flex: 1,
    // backgroundColor: "#D3D3D3",
    backgroundColor: "white",
    // borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
});

// Map dispatch actions to component props
const mapDispatchToProps = (dispatch) => {
    return {
      clearCart: () => dispatch(actions.clearCart())
    };
  };

export default connect(null, mapDispatchToProps)(Confirm);
