import React, { Component } from 'react';
import { View, Image, Dimensions, StatusBar, StyleSheet } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <Image 
          style={styles.image}
          source={{uri: 'https://s3.eu-west-3.amazonaws.com/countries-app/media/header.jpeg'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width*.75
  }
})