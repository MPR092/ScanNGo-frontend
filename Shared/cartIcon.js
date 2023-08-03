import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import IconBadge from 'react-native-icon-badge';

import { connect } from 'react-redux';

const CartIcon = (props) => {
    <>
        {props.cartItems.length ? (
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
            <IconBadge
              MainElement={
                <View style={{backgroundColor:'#489EFE',
                  width:50,
                  height:50,
                  margin:6
                }}/>
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>{props.cartItems.length}</Text>
              }
              IconBadgeStyle={
                {width:30,
                height:30,
                backgroundColor: '#FF00EE'}
              }
              Hidden={props.cartItems.length==0}
              />
          </View>
        ) : null}
    </>
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    IconBadge: {
        position:'absolute',
        top:1,
        right:1,
        width:20,
        height:20,
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000'
      }
})

export default connect(mapStateToProps)(CartIcon);