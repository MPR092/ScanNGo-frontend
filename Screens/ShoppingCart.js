import * as React from "react";
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
// import { Image } from "expo-image";
// import { Button } from "@ui-kitten/components";
// import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

//Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

// For Barcode Scan
import { Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

//random object id
// import { ObjectID } from 'bson';

const ShoppingCart = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [total, setTotal] = useState('');

  const [mydata, setmyData] = useState([
    {
      _id: "6493137939750bdbfdce02f5",
      upc: 101920902039,
      name: "Powerade Fruit Punch",
      price: 3.25,
      MultiDiscountQty: 2,
      MultiDiscountPrice: 5,
      __v: 0,
      id: "6493137939750bdbfdce02f5",
    },
    {
      MultiDiscountQty: 1,
      MultiDiscountPrice: 1,
      _id: "6493b8ee11a43dbefcab0405",
      upc: 101920902038,
      name: "Powerade Blueberry",
      price: 3.25,
      __v: 0,
      id: "6493b8ee11a43dbefcab0405",
    },
    {
      MultiDiscountQty: 1,
      MultiDiscountPrice: 1,
      _id: "6493c9946eee2742b0306597",
      upc: 101920902037,
      name: "Powerade Orange",
      price: 3.25,
      __v: 0,
      id: "6493c9946eee2742b0306597",
    },
    {
      MultiDiscountQty: 1,
      MultiDiscountPrice: 1,
      _id: "6494a06057830be1f97e5f05",
      upc: 101920902037,
      name: "Powerade Grape Blast",
      price: 3.25,
      __v: 0,
      id: "6494a06057830be1f97e5f05",
    },
    {
      _id: "64962734be0df7eea1b3febc",
      upc: 22333171721,
      name: "Proctor Silex Iron",
      price: 79.99,
      MultiDiscountQty: 1,
      MultiDiscountPrice: 1,
      __v: 0,
      id: "64962734be0df7eea1b3febc",
    },
    {
      _id: "649727d8a368763089bd4e12",
      upc: 39800011329,
      name: "Energizer AA4",
      price: 12.47,
      MultiDiscountQty: 1,
      MultiDiscountPrice: 1,
      __v: 0,
      id: "649727d8a368763089bd4e12",
    }
  ]);

  // const [mydata, setmyData] = useState('');

  // function generateObjectId() {
  //   const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  //   const randomValue = Math.floor(Math.random() * 16777215).toString(16);
  //   const objectId = timestamp + '0'.repeat(8 - timestamp.length) + randomValue;
  //   return new ObjectID(objectId);
  // }

  // const rid = generateObjectId();


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

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // let handleAdd = (text) => {
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

  //Modal Control
  // const [modalVisible, setModalVisible] = useState(false);

  // const handleButtonClick = () => {
  //   setModalVisible(true);
  // };

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  // };

  //for total
  // if (myData !== null)
  // {
    let sumOfPrices = 0;
    sumOfPrices = mydata.map(data => data.price).reduce((acc, amount) => acc + amount);
  
    let totalP = sumOfPrices.toFixed(2)
  // } else {
  //   totalP = 0;
  // }    


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
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.containerHeader}>
        <Text style={styles.title}>Cart</Text>
        <View style={styles.underlineContainer}>
          <View style={styles.underline} />
        </View>
      </View> */}

      <View style={styles.body}>
          <View>
          <FlatList
            legacyImplementation="true"
            data={mydata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          </View>

      </View>

      <View style={styles.footer}>
        
        <View style={styles.itemTotal}>
          <Text style={styles.textTotal}>Total: $ {totalP}</Text>
        </View>
    {/*Total 224.86 */}
      {/* <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Scan The Barcodes</Text>
            
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={{ backgroundColor: 'red', color: 'white', padding: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

        <TouchableOpacity style={styles.button}>
          {/* <Text style={styles.buttonText}>Scan</Text> */}
          <Button style={styles.button} title={'Tap to Scan'} />
          <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject, styles.scanner]}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.codabar , BarCodeScanner.Constants.BarCodeType.code39, BarCodeScanner.Constants.BarCodeType.code93, BarCodeScanner.Constants.BarCodeType.code128]}
            />
            {scanned && <Button style={styles.button} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </TouchableOpacity>
      
        


        <TouchableOpacity style={styles.button2} onPress={() => handleCheckout()}>
          <Text style={styles.buttonText}>Checkout $ {totalP}</Text>
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
    // margin: 50
  },
  button: {
    flex: 1,
    backgroundColor: "#6342E8",
    borderRadius: 15,
    paddingVertical: 12,
    padding: 10,
    margin: 10,
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

export default ShoppingCart;
