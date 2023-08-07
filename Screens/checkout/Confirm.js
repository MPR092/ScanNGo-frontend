import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

//Get Redux State
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const Confirm = (props) => {

    const confirmOrder = () => {
        //server connect
        console.log("Order Confirmed");

        setTimeout( () => {
            props.clearCart();
            props.navigation.navigate('Cart');
        }, 500)
    }

  const confirm = props.route.params;
//   console.log(confirm.order.orderItems[0]);

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
              data={confirm.order.orderItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>
        </View>
      ) : null}
      <View style={styles.footer}>
          <TouchableOpacity style={styles.button2} onPress={() => confirmOrder()}>
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
    flex: 0.5,
    //   flexDirection: "column", // Display input fields in a column
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
