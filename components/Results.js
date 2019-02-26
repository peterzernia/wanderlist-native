import React, { Component } from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'

export default class Results extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>
          {this.props.country.name}
        </Text>
        <Image 
          style={styles.image}
          source={{uri: this.props.country.flag}}
        />
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
  image: {
    width: '100%',
    height: 400
  }
})