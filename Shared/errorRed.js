import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ErrorRed = (props) => {
    return(
        <View style={styles.container}>
            <Text  style={styles.text}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        alignItems: 'center',
        margin: 10,
        // backgroundColor: 'white'
    },
    text: {
        color: 'red',
        // textDecorationStyle: 'blink',
        // textDecorationColor: 'red',
        // textDecorationLine: 'underline',
    }
})

export default ErrorRed;