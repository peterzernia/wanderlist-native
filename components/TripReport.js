import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

export default class TripReport extends Component {
  render() {
    var { tripReport } = this.props;

    const listCountries = tripReport.countries.map(country => {
      <Text>{country.name}</Text>
    });
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{tripReport.title} </Text>
          <Text style={styles.author}>{tripReport.author.username}</Text>
        </View>
        <View style={styles.body}>
          <Text>{tripReport.content.substr(0,100)}</Text>
        </View>
        <View style={styles.footer}>
          {listCountries}
          <TouchableOpacity>
          </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 10
  },
  header: {
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  author: {
    textAlign: 'center',
    fontSize: 20
  },
  body: {
    height: 100,
    justifyContent: 'space-around'
  },
  footer: {
    height: 50
  }
})