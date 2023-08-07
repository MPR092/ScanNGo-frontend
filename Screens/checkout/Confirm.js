import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Get Redux State
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Confirm = (props) => {
    
    const confirm = props.route.params;

    return(
        <KeyboardAwareScrollView style={styles.structure}>
            <View style={styles.container}>
                <Text style={styles.confirmText}>Confirm Order</Text>
            </View>
            {props.route.params ? 
            <View style={{ fontSize: 20, borderColor: 'grey' }}>

            </View>
            : null }
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    structure: {
      flex: 1,
      paddingTop: 40,
    //   backgroundColor: "#b5babd",
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
    body: {
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

export default Confirm;