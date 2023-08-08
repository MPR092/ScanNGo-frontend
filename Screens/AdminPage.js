import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Icons
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

//Displaying error over the submit button
import ErrorRed from "../Shared/errorRed";

//communication with the server
import axios from "axios";
import baseURL from "../assets/common/BaseUrl";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminPage = (props) => {
  const [upc, setUpc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [multiDiscountQty, setMultiDiscountQty] = useState("");
  const [multiDiscountPrice, setMultiDiscountPrice] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {

    //get token
    AsyncStorage.getItem('token')
    .then((res) => {
      setToken(res)
    })
    .catch((error) => console.log(error))
  }, [])

  const handleAddProduct = () => {

    //to append jwt token to the api
    const config = {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${token}`
      }
    }

    // (multiDiscountQty === "") | (multiDiscountPrice === "") // additional
    if (upc === "") {
      setError("Please enter product upc");
    } else if (name === "") {
      setError("Please enter product name");
    } else if (price === "") {
      setError("Please enter product price");
    } else if (multiDiscountQty === "") {
      setError("Please enter discount Quantity");
    } else if (multiDiscountPrice === "") {
      setError("Please enter discount Price");
    } else {
      // console.log('Product Upload Started')

      let product = {
        upc: upc,
        name: name,
        price: price,
        MultiDiscountQty: multiDiscountQty,
        MultiDiscountPrice: multiDiscountPrice
      };
      // console.log(product);

      // Register product to database using server api
      axios
        .post(`${baseURL}/products/`, product, config)
        .then((res) => {
          // console.log(res);
          console.log("Product Upload Successfull");
          if (res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Product Upload successful",
              text2: `Try a different product`,
            });
            setTimeout(() => {
              // navigation.navigate("Login");
            }, 500);
          }
        })
        .catch((error) => {
          // Handle error response from server

          if (error && error.response.status === 401) {
            // Invalid upc, display error message
            setError(error.response.data);
            Toast.show({
              topOffset: 60,
              type: "info",
              text1: "Product Already Exists",
              text2: "Please try a different Product",
            });
            // console.log(error.response.data)
          } else {
            // Other errors, display a generic error message
            setError("An error occurred. Please try again later.");
          }
        });
    }
  };



  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* Admin Icon */}
      <View style={styles.header}>
        <FontAwesome5
          name="cog"
          size={50}
          style={styles.profileIcon}
          color="#6342E8"
        />
        <Text style={styles.profileIconText}>Upload Product</Text>
      </View>

      <View style={styles.body}>
        
        <View style={styles.formContainer}>
          
          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputText} >UPC: </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Product UPC"
              placeholderTextColor="#000000"
              keyboardType="numeric"
              autoCapitalize="none"
              id={"upc"}
              value={upc}
              onChangeText={(text) => setUpc(text)}
            />
          </View>

          <View style={styles.inputContainer}>
          {/* <Text style={styles.inputText} >Name: </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              placeholderTextColor="#000000"
              keyboardType="default"
              // autoCapitalize="none"
              id={"name"}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
          {/* <Text style={styles.inputText} >Price: </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Product Price"
              placeholderTextColor="#000000"
              keyboardType="numeric"
              id={"price"}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputText} >UPC: </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Multi Discount Quantity"
              placeholderTextColor="#000000"
              keyboardType="numeric"
              autoCapitalize="none"
              id={"multiDiscountQty"}
              value={multiDiscountQty}
              onChangeText={(text) => setMultiDiscountQty(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputText} >UPC: </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Multi Discount Price"
              placeholderTextColor="#000000"
              keyboardType="numeric"
              autoCapitalize="none"
              id={"multiDiscountPrice"}
              value={multiDiscountPrice}
              onChangeText={(text) => setMultiDiscountPrice(text)}
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.outlinedText}>
              {error ? <ErrorRed message={error} /> : null}
            </View>

            <TouchableOpacity style={styles.button2} onPress={() => handleAddProduct()}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
  },
  center: {
    // alignContent: 'center',
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    justifyContent: "center",
  },
  body: {
    flex: 3,
    flexDirection: 'row',
    // borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
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
  footer: {
    flex: 1,
    // padding: 40,
    // margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    flex: 1,
    backgroundColor: "#6342E8",
    borderRadius: 10,
    paddingVertical: 10,
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bodyText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderRadius: 15,
    paddingVertical: 10,
    margin: 1,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    elevation: 20,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    // marginVertical: 1,
    // backgroundColor: 'black',
    // width: "100%",
  },
  input: {
    flex: 5,
    height: 50,
    borderWidth: 2,
    borderColor: '#000000',
    // backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent input field
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    color: "#000000",
    // fontSize: 16,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 30,
    // flexDirection: 'column', 
    alignItems: "center",
    justifyContent: 'center',
    // backgroundColor: 'white',
    // backgroundColor: 'grey',
  },
  inputText: {
    flex: 1,
    // flexDirection: "row",
    // flexDirection: 'column', 
    alignItems: "center",
    justifyContent: 'center',
    // backgroundColor: 'grey',
    fontSize: 20,
  },
  outlinedText: {
    // flex: 1,
    // borderWidth: 0.5,
    // borderColor: 'red',
    // padding: 0.1,
    borderRadius: 15,
    marginVertical: 10,
    // fontSize: 16,
    // fontWeight: 'bold',
    color: 'red',
  },
});

export default AdminPage;
