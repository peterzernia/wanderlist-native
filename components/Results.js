import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Results(props) {
  const { country, user, updatingUser, handleUpdate, pendingCountry } = props;

  // Map the userCountries into an array of just the countries' names.
  const userCountries = user.countries.map(country => country.name);


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
          // Render Remove button when country is included in users list, but is not the pending country.
          (userCountries.includes(country.name) && (!updatingUser || (updatingUser && pendingCountry.name !== country.name)))
          && <Icon name='remove-circle' size={25} />
        }
        {
          // Render Add button when country is not included in users list, but is not the pending country.
          (!userCountries.includes(country.name) && (!updatingUser || (updatingUser && pendingCountry.name !== country.name)))
          && <Icon name='add-circle' size={25} />
        }
        {
          // If the updatingUser, and the pendingCountry matches the country shown, render loader
          (updatingUser && pendingCountry.name === country.name)
          && <ActivityIndicator size="small" color="black" />
        }
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
      </View>
    </View>
  )
}

Results.propTypes = {
  country: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updatingUser: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  pendingCountry: PropTypes.object.isRequired,
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
    flexWrap: 'wrap',
    width: '70%'
  },
  buttonContainer: {
    width: 25,
    marginRight: 20,
  },
  button: {
    width: 25,
    height: 25,
  },
  imageContainer: {
    width: Dimensions.get('window').width*.95,
    height: Dimensions.get('window').width*.95*2/3
  }
});