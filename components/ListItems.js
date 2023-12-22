import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import PictureDetails from './PictureDetails';

const ListItems = props => {
  const editData = () => {
    props.navigation.navigate('Add', {dataIndex: props.dataIndex});
  };

  const NoImage = () => {
    return <View style={styles.pictureView}></View>;
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={editData}>
          <View style={styles.editButton}>
            <Text style={styles.textStyle}>EDIT</Text>
          </View>
        </TouchableWithoutFeedback>

        {props.picture === null ? (
          <NoImage />
        ) : (
          <View style={styles.pickedPictureView}>
            <Image
              source={{uri: props.picture}}
              style={{width: 90, height: 110, resizeMode: 'contain'}}
            />
          </View>
        )}

        <View style={{width: '35%'}}>
          <PictureDetails
            heading="MARKDOWN"
            width="60%"
            detail={props.markdown}
          />
          <PictureDetails heading="BRAND" width="70%" detail={props.brand} />
          <PictureDetails heading="COLOR" width="70%" detail={props.color} />
          <PictureDetails heading="SIZE" width="80%" detail={props.size} />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>
            {' '}
            DESCRIPTION
          </Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.textStyle}>{props.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  editButton: {
    backgroundColor: '#00B805',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    width: '12%',
  },

  pictureView: {
    backgroundColor: '#333333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '23%',
  },

  pickedPictureView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 15,
    // height: "80%",
    // width: "23%"
  },

  descriptionBox: {
    backgroundColor: '#333333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '100%',
    marginTop: 5,
  },

  textStyle: {
    fontSize: 11,
    color: 'white',
  },

  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
});

export default ListItems;
