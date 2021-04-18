import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'

import { ADD_BUTTON } from '../assets/Assets'

const ActionButton = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress} >
            <View style={[styles.buttonView, { marginTop: props.marginTop }]} >
                <Image source={ADD_BUTTON} style={styles.buttonImage} />
                <Text style={styles.buttonText} >{props.buttonText}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        width: "100%", justifyContent: "center", alignItems: "center"
    },

    buttonText: {
        color: "white"
    },

    buttonImage: {
        width: 90, height: 90, position: "absolute"
    },



})

export default ActionButton