import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const PictureDetails = (props) => {
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.detailHeading} >{props.heading}</Text>
            </View>

            <View style={[styles.detailsText, { width: props.width }]} >
                <Text style={[styles.detailHeading, { fontWeight: "normal" }]}> {props.detail} </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },

    detailHeading: {
        fontSize: 11,
        color: "white",
        fontWeight: "bold"
    },

    detailsText: {
        borderRadius: 20,
        height: "100%",
        backgroundColor: "#333333",
        padding: 3
    }
})

export default PictureDetails