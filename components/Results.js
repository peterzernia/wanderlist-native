import React, { Component } from 'react';
import { 
  ActivityIndicator, Dimensions, Image, 
  StyleSheet, Text, TouchableOpacity, View 
} from 'react-native';

export default class Results extends Component {
  render() {

    // Map the userCountries into an array of just the countries' names.
    const userCountries = this.props.user.countries.map(country => country.name);
    const { country, updatingUser, handleUpdate } = this.props;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          {/* This empty View is for offsetting the button on the opposite side of the header text */}
          <View style={styles.buttonContainer}></View>
          <Text style={styles.headerText}>
            {country.name}
          </Text>
          <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => handleUpdate(country)}
          >
          {
            (!updatingUser && userCountries.includes(country.name))
            && (
              <Image
                style={styles.button}
                source={require('../assets/images/remove.png')}
              />
            )
          }
          {
            (!updatingUser && !userCountries.includes(country.name))
            && ( 
              <Image
                style={styles.button}
                source={require('../assets/images/add.png')}
              />  
            )
          }
          {updatingUser && <ActivityIndicator size="small" color="black" />}
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 23,
    padding: 15,
  },
  buttonContainer: {
    width: 25,
    margin: 15
  },
  button: {
    width: 25,
    height: 25,
  },
  imageContainer: {
    width: Dimensions.get('window').width*.95,
    height: Dimensions.get('window').width*.95*2/3
  }
}) 