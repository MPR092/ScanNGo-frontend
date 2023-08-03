import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

//database
import axios from "axios"; // Import Axios to make API requests
import baseURL from "../assets/common/BaseUrl";

//Cart State
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";

//import Fancy Modal for clearing cart
import FancyConfirmModal from '../Shared/FancyConfirmModal'

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

// For Barcode Scan
import { Button, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ShoppingCart = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Modal for confirm clear cart
  const [isModalVisible, setModalVisible] = useState(false);

  //Handling Clear Cart Button
  const handleClearCart = () => {
    // Perform the action to clear the cart here
    props.clearCart();

    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Cart Cleared",
    });

    // After clearing the cart, close the modal
    setModalVisible(false);
  };

  //handle checkout
  const handleCheckout = () => {
    props.navigation.navigate("Success");
  };

  //for permissions
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  //handlebarcode scan
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const upc = parseInt(data, 10);

    // console.log("UPC: ", upc);

    // Send the UPC data request to the API
    //search for upc in database
    if (upc) {
      axios
        .get(`${baseURL}/products/search/${upc}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data);
          // Handle the response from the API
          if (res.data.success === false) {
            // Item not found, show error message to the user
            console.log(res.data.message);
            Toast.show({
              topOffset: 60,
              type: "info",
              text1: `Product not found`,
            });
          } else {
            // Item found, handle the data for the found item
            if (res.data.product) {
              const productDataFromAPI = res.data.product;
              // Do something with the product data
              console.log("Product found:", productDataFromAPI);

              // add to redux store
              props.addItemToCart(productDataFromAPI);

              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Item Added to the cart",
              });
            }
          }
        })
        .catch((error) => {
          // Handle API error
          if (error.response && error.response.status === 404) {
            // Invalid upc, display error message
            console.log("UPC: ", upc, "|", error.response.data.message);
            Toast.show({
              topOffset: 60,
              type: "info",
              text1: `${error.response.data.message}`,
            });
          } else if (error && error.response.status === 500) {
            // Server not connected
            console.log("Server Error: ", error.response.data);
          } else {
            // Other errors, display a generic error message
            console.log("An error occurred", error);
          }
        });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  var totalP = 0;
  props.cartItems.forEach(cart => {
    return (totalP += cart.product.price)
  });

  //rendering data
  const renderItem = ({ item }) => (
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scannerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          {/* <Text style={styles.buttonText}>Scan</Text> */}
          {/* <Button style={styles.button} title={'Tap to Scan'} /> */}
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject]}
            barCodeTypes={[
              BarCodeScanner.Constants.BarCodeType.ean13,
              BarCodeScanner.Constants.BarCodeType.ean8,
              BarCodeScanner.Constants.BarCodeType.codabar,
              BarCodeScanner.Constants.BarCodeType.code39,
              BarCodeScanner.Constants.BarCodeType.code93,
              BarCodeScanner.Constants.BarCodeType.code128,
            ]}
          />
          {scanned && (
            <Button
              style={StyleSheet.absoluteFillObject}
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.ListContainer}>
          {props.cartItems.length ? (
            <>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingVertical: 10,
                  // backgroundColor: "#D3D3D3",
                  backgroundColor: "#b5babd",
                }}
              >
                <FlatList
                  legacyImplementation="true"
                  data={props.cartItems}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.ListEmpty}>
                <Text style={styles.textPrice}>Your Cart is Empty</Text>
                <Text style={styles.textPrice}>
                  Scan the items to add it to your Cart
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity style={styles.clearCart} onPress={() => setModalVisible(true)}>
            <Text style={styles.clearCartText}>Clear Cart</Text>
          </TouchableOpacity>

          <FancyConfirmModal
        isVisible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleClearCart}
      />

          <View style={styles.itemTotal}>
            {/* <Text style={styles.textTotal}>Total: $ {totalP}</Text> */}
            <Text style={styles.textTotal}>Total: $ {totalP}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => handleCheckout()}
        >
          {/* <Text style={styles.buttonText}>Checkout $ {totalP}</Text> */}
          <Text style={styles.buttonText}>Checkout (${totalP})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    // width: "100%",
    alignItems: "center",
    paddingBottom: 10,
    // flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  itembox: {
    // color: 'blue',
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: 'blue'
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#b5babd'
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 5,
    // backgroundColor: 'blue'
  },
  footer: {
    flex: 1,
    // padding: 60,
    marginTop: 5,
  },
  button: {
    flex: 1,
    // backgroundColor: "#6342E8",
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 10,
    // alignItems: 'center',
    justifyContent: "center",
    // textAlign: 'center',
    overflow: "hidden",
    // paddingVertical: 12,
    // padding: 10,
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
    borderRadius: 5,
    alignItems: "center",
  },
  itemTotal: {
    flex: 1,
    // left: 100,
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: 20,
  },
  clearCart: {
    flex: 0.5,
    // left: 100,
    alignSelf: "stretch",
    // alignItems: "center",
    justifyContent: "center",
    // alignSelf: 'center',
    // paddingHorizontal: 20,
    // backgroundColor: "#0000EE",
    // borderWidth: '0.2',
    borderRadius: 10,
    // borderColor: '#5177f5',
    // backgroundColor: '#5177f5',
  },
  clearCartText: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: 'red',
    textAlign: "center",
    color: "#5177f5",
    justifyContent: "center",
    // color: "white",
    fontSize: 20,
    // fontWeight: "bold",
  },
  textTotal: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  scanner: {
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
    // display: 'block',
  },
  List: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  ListContainer: {
    flex: 1,
    // backgroundColor: "#D3D3D3",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  ListEmpty: {
    flex: 1,
    // padding: 5,
    backgroundColor: "#D3D3D3",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Map Redux state to component props
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

// Map dispatch actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
    clearCart: () => dispatch(actions.clearCart()),
  };
};

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
