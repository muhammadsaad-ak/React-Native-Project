import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

import ActionButton from '../../components/ActionButton';
import ListItems from '../../components/ListItems';


const Home = (props) => {
    const selectedData = useSelector((state) => state.data.data);

    const renderList = (itemData) => {
        return (
            <View style={{ marginBottom: 20 }} >
                <ListItems navigation={props.navigation} dataIndex={itemData.item.id} markdown={itemData.item.markdown} brand={itemData.item.brand} color={itemData.item.color} size={itemData.item.size} picture={itemData.item.picture} description={itemData.item.description} />
            </View>
        )
    }

    const navigate = () => {
        props.navigation.navigate("Add")
    }

    return (
        <View style={styles.mainView} >
            <ActionButton buttonText="ADD" marginTop={30} onPress={navigate} />

            <View style={styles.flatListView} >
                <FlatList data={selectedData} renderItem={renderList} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    listContainer: {
        height: "100%"
    },

    mainView: {
        flex: 1, alignItems: "center", backgroundColor: "#2c2c2c"
    },

    flatListView: {
        marginTop: 60, paddingBottom: 50
    }
})


export default Home