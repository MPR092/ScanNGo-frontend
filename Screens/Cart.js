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
import axios from 'axios'; // Import Axios to make API requests
import baseURL from '../assets/common/BaseUrl'

//Cart State
import { connect } from "react-redux";
import * as actions from '../Redux/Actions/cartActions';

// import { Image } from "expo-image";
// import { Button } from "@ui-kitten/components";
// import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

// For Barcode Scan
import { Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Cart = (props, {navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [total, setTotal] = useState('');



  //handle checkout
  const handleCheckout = () => {
    navigation.navigate("Success")
  }

  //for permissions
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  //handlebarcode scan
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const upc = parseInt(data, 10);

  // Send the UPC data request to the API
  //search for upc in database
  if (upc) {
    axios.get(`${baseURL}/products/search/${upc}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // Handle the response from the API
      if (res.data.success === false) {
        // Item not found, show error message to the user
        console.log(res.data.message);
      } else {
        // Item found, handle the data for the found item
        const productDataFromAPI = res.data.product;
        // Do something with the product data
        console.log("Product found:", productDataFromAPI);


        // add to redux store
        // props.addItemToCart(productDataFromAPI)
      }
    })
    .catch((error) => {
      // Handle API error
      console.log("Error while fetching product data from the API:", error);
    });
  }

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // let handleAdd = (text) => {
    setmyData((prevList) => {
        return [
          {
            _id: Math.random(),
            upc: upc,
            name: "Unknown Product",
            price: Math.floor(Math.random() * 99) + 1,
            MultiDiscountQty: 1,
            MultiDiscountPrice: 1,
            __v: 0,
            id: Math.random(),
          },
          ...prevList,
        ];
      });

    // };
      
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Item Added to the cart"
      })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
    let sumOfPrices = 0;
    sumOfPrices = mydata.map(data => data.price).reduce((acc, amount) => acc + amount);
  
    let totalP = sumOfPrices.toFixed(2)    


  //rendering data
  const renderItem = ({ item }) => (
    <View style={styles.data}>

      <View style={styles.itemContainer}>

      <View style={{ flex:1, flexDirection: 'row'}}>
        <View style={styles.item1}>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textUpc}>{item.upc}</Text>
        </View>

        <View style={styles.itemQty}>
          <Text style={styles.textQty}>Qty: 1</Text>
        </View>

        <View style={styles.item3}>
          <Text style={styles.textPrice}>$ {item.price}</Text>
        </View>
      
      </View>
      </View>
    </View>
  );

  return (
    <>
    <SafeAreaView style={styles.container}>

      <View style={styles.body}>
          <View>
          {/* <FlatList
            legacyImplementation="true"
            data={mydata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          /> */}

          
          { props.cartItems.map(x => {
            return(
              <Text>{x.product.name}</Text>
            )
          })
          }
          </View>

      </View>

      <View style={styles.footer}>
        
        <View style={styles.itemTotal}>
          {/* <Text style={styles.textTotal}>Total: $ {totalP}</Text> */}
          <Text style={styles.textTotal}>Total 224.86</Text>
        </View>
    

        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          {/* <Text style={styles.buttonText}>Scan</Text> */}
          {/* <Button style={styles.button} title={'Tap to Scan'} /> */}
          <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[ StyleSheet.absoluteFillObject ]}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.codabar , BarCodeScanner.Constants.BarCodeType.code39, BarCodeScanner.Constants.BarCodeType.code93, BarCodeScanner.Constants.BarCodeType.code128]}
            />
            {scanned && <Button style={StyleSheet.absoluteFillObject} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </TouchableOpacity>
      
        


        <TouchableOpacity style={styles.button2} onPress={() => handleCheckout()}>
          <Text style={styles.buttonText}>Checkout $ {totalP}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
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
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 2,
    // backgroundColor: 'blue'
  },
  footer: {
    flex: 1,
    // padding: 60,
    marginTop: 5
  },
  button: {
    flex: 1,
    // backgroundColor: "#6342E8",
    borderRadius: 15,
    margin: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
    overflow: 'hidden',
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // flex:1,
    flexDirection: "row",
  },
  textName: {
    color: "#6342E8",
  },
  textQty: {
    color: "#000000",
  },
  item1: {
    flex:2,
    alignSelf: 'left',
    padding: 10
  },
  textUpc: {
    color: "grey",
  },
  item2: {
    flex:2,
    alignSelf: 'left',
    padding: 10
  },
  textPrice: {
    textAlign: 'center',
    color: "black",
    fontSize: 20,
    fontWeight: '500'
  },
  item3: {
    flex:1,
    // flexDirection: 'column',
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'flex-end'
    // padding: 10
  },
  itemQty:{
    flex:1,
    alignSelf: 'flex-end',
    paddingBottom: 7
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    alignItems: 'center'
  },
  itemTotal: {
    left: 100,
    alignItems: 'center',
    justifyContent:"center",
    // paddingRight: 20,
  },
  textTotal: {
    textAlign: 'center',
    color: "black",
    fontSize: 20,
    fontWeight: 'bold'
  },
  scanner: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    // display: 'block',
  }
});

// Map Redux state to component props
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
      cartItems: cartItems,
  }
}

// Map dispatch actions to component props
const mapDispatchToProps = (dispatch) => {
return {
    addItemToCart: (product) =>
        dispatch(actions.addToCart({quantity: 1, product}))
}
}

// Connect the Cart component with the first set of mapStateToProps and mapDispatchToProps
// const ConnectedCart1 = connect(null, mapDispatchToProps)(Cart);

// Connect the Cart component with the second set of mapStateToProps and mapDispatchToProps
// const ConnectedCart2 = connect(mapStateToProps, null)(Cart);

// Export the connected components individually using named exports
// export { ConnectedCart1, ConnectedCart2 };

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// export default connect(null, mapDispatchToProps)(Cart);
// export default connect(mapStateToProps, null)(Cart);
