import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import { CAMERA_ICON, CAMERA_VIEW, BACK_ARROW } from '../../assets/Assets';
import ActionButton from '../../components/ActionButton'
import DataModel from '../../data/DataModel';
import * as dataActions from '../../redux/actions/mainAction'

const Add = (props) => {
    const currentDataIndex = props.navigation.getParam('dataIndex')
    const selectedData = useSelector((state) => state.data.data);
    // const reversedSelectedData = selectedData.reverse()
    const filteredData = selectedData.filter((data) => data.id === currentDataIndex)

    const [markdown, setMarkDown] = useState(filteredData.length !== 0 ? filteredData[0].markdown : '')
    const [brand, setBrand] = useState(filteredData.length !== 0 ? filteredData[0].brand : '')
    const [color, setColor] = useState(filteredData.length !== 0 ? filteredData[0].color : '')
    const [size, setSize] = useState(filteredData.length !== 0 ? filteredData[0].size : '')
    const [description, setDescription] = useState(filteredData.length !== 0 ? filteredData[0].description : '')
    const [picture, setPicture] = useState(filteredData.length !== 0 ? filteredData[0].picture : null)
    const [pictureCancelled, setPictureCancelled] = useState(false)
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentDataIndex >= 0) {
            setEdit(true)
        }
    }, [])

    const handleInput = (key, value) => {
        if (key === 'markdown') {
            setMarkDown(value)
        }

        else if (key === 'brand') {
            setBrand(value)
        }

        else if (key === 'color') {
            setColor(value)
        }

        else if (key === 'description') {
            setDescription(value)
        }

        else if (key === 'size') {
            setSize(value)
        }
    }

    const clearInputs = () => {
        setMarkDown('')
        setBrand('')
        setColor('')
        setDescription('')
        setSize('')
        setPicture('')
    }

    const navigate = () => {
        props.navigation.goBack()
        clearInputs()
    }

    const addPicture = () => {
        ImagePicker.showImagePicker(
            {
                title: 'Select Image',
                quality: 0.6
            },
            response => {
                if (response.didCancel) {
                    setPictureCancelled(true)
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    setPictureCancelled(false)
                    setPicture(response.uri)
                }

            }

        );
    }

    const addNewData = async () => {
        const newIndex = selectedData[selectedData.length - 1].id + 1
        const newData = new DataModel(
            newIndex,
            markdown,
            brand,
            color,
            size,
            description,
            picture
        )

        await dispatch(dataActions.addData(newData))
        props.navigation.navigate('Home')
        clearInputs()
    }

    const editData = async () => {
        const editedData = new DataModel(
            currentDataIndex,
            markdown,
            brand,
            color,
            size,
            description,
            picture
        )

        await dispatch(dataActions.editData(editedData, currentDataIndex))
        props.navigation.navigate('Home')
        clearInputs()
    }

    const deleteData = () => {
        dispatch(dataActions.deleteData(currentDataIndex))
        props.navigation.navigate('Home')
        clearInputs()
    }


    return (
        <View style={styles.background} >

            <TouchableWithoutFeedback onPress={navigate} >
                <View style={styles.backArrowContainer} >
                    <View style={styles.backArrowView} >
                        <Image source={BACK_ARROW} style={styles.backArrowStyle} />
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {!edit && (
                <TouchableWithoutFeedback onPress={addPicture} >
                    <View style={styles.cameraIconView} >
                        <Image source={CAMERA_VIEW} style={styles.cameraIconBackground} />
                        <Image source={CAMERA_ICON} style={styles.cameraIcon} />
                    </View>
                </TouchableWithoutFeedback>
            )}

            {(picture === null || pictureCancelled) ? (
                <View style={styles.pictureView} >
                    <Text style={styles.textColor} >PICTURE</Text>
                </View>
            ) : (
                    <View style={styles.pickedPictureView} >
                        <Image source={{ uri: picture }} style={{ width: 140, height: 120, resizeMode: "contain" }} />
                    </View>
                )}


            <View style={{ marginTop: 30 }} >
                <View style={[styles.inputContainer, { width: "52%" }]}>
                    <View style={styles.inputHeadingView} >
                        <Text style={styles.inputHeadingText} >MARKDOWN</Text>
                    </View>

                    <View style={styles.textInputView} >
                        <TextInput style={styles.textInputPlaceholder} value={markdown} onChangeText={(text) => handleInput('markdown', text)} />
                    </View>
                </View>

                <View style={[styles.inputContainer, { width: "57%" }]}>
                    <View style={styles.inputHeadingView} >
                        <Text style={styles.inputHeadingText} >BRAND</Text>
                    </View>

                    <View style={styles.textInputView} >
                        <TextInput style={styles.textInputPlaceholder} value={brand} onChangeText={(text) => handleInput('brand', text)} />
                    </View>
                </View>

                <View style={[styles.inputContainer, { width: "57%" }]}>
                    <View style={styles.inputHeadingView} >
                        <Text style={styles.inputHeadingText} >COLOR</Text>
                    </View>

                    <View style={styles.textInputView} >
                        <TextInput style={styles.textInputPlaceholder} value={color} onChangeText={(text) => handleInput('color', text)} />
                    </View>
                </View>

                <View style={[styles.inputContainer, { width: "60%" }]}>
                    <View style={styles.inputHeadingView} >
                        <Text style={styles.inputHeadingText} >SIZE</Text>
                    </View>

                    <View style={styles.textInputView} >
                        <TextInput style={styles.textInputPlaceholder} value={size} onChangeText={(text) => handleInput('size', text)} />
                    </View>
                </View>
            </View>



            <View style={styles.actionButtonView} >
                <Text style={styles.inputHeadingText} >DESCRIPTION</Text>
                <View style={styles.descriptionInputView} >
                    <TextInput style={[styles.textInputPlaceholder]} multiline={true} value={description} onChangeText={(text) => handleInput('description', text)} />
                </View>

                <ActionButton buttonText="SAVE" marginTop={40} onPress={edit ? editData : addNewData} />


                {edit && (
                    <TouchableWithoutFeedback onPress={deleteData} >
                        <View style={{ marginTop: 50 }} >
                            <Text style={styles.deleteButtonText} >DELETE</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>


        </View >
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1, alignItems: "center", backgroundColor: "#2c2c2c"
    },

    cameraIconView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },

    cameraIconBackground: {
        width: 90,
        height: 90,
        resizeMode: "contain"
    },

    deleteButtonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold"
    },

    cameraIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        position: "absolute"
    },

    pictureView: {
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        height: "15%",
        borderRadius: 20,
        marginTop: 15
    },

    pickedPictureView: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginTop: 15
    },

    textColor: {
        color: "white"
    },

    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3
    },

    inputHeadingView: {
        marginRight: 10
    },

    inputHeadingText: {
        fontSize: 12,
        color: "white",
        fontWeight: "bold"
    },

    textInputView: {
        backgroundColor: "#333333",
        height: "70%",
        width: "50%",
        borderRadius: 20,
        paddingLeft: 8
    },

    textInputPlaceholder: {
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 12
    },

    actionButtonView: {
        marginTop: 30,
        width: "90%",
        alignItems: "center"
    },

    descriptionInputView: {
        backgroundColor: "#333333",
        borderRadius: 20,
        paddingLeft: 8,
        width: "70%",
        marginTop: 10,
        height: "35%"
    },

    backArrowContainer: {
        width: "90%",
        alignItems: "flex-start",
        top: 30,
        left: 10
    },

    backArrowView: {
        height: 35,
        width: 35
    },

    backArrowStyle: {
        flex: 1,
        resizeMode: "contain",
        height: null,
        width: null
    }
})

export default Add