import React, { Component } from 'react';
import { Dimensions, Text, StyleSheet, View } from 'react-native';

export default class Results extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>
          {this.props.country.name}
        </Text>
        <View style={styles.imageContainer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5, 
    borderWidth: .1,
    width: '95%',
    alignItems: 'center',
    marginBottom: 10
  },
  header: {
    textAlign: 'center',
    fontSize: 23,
    padding: 15,
  },
  imageContainer: {
    width: Dimensions.get('window').width*.95,
    height: Dimensions.get('window').width*.95*2/3
  }
}) 