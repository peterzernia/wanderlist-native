import React, { PureComponent } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Layout from '../constants/Layout';

export default class Results extends PureComponent {
  constructor() {
    super();
    this.state = {
      height: 0,
    }
  }

  // Get flag dimensions before loading image.
  componentDidMount() {
    var { country } = this.props;

    if (!this.isCancelled) {
      Image.getSize(country.flag, (width, height) => {
        this.setState({  
          height: Layout.window.width * .95 * (height / width) 
        });
      });
    }
  }

  componentWillUnmount() {
    // Can't call setState on an unmounted component.
    this.isCancelled = true;
  }

  render() {
    const { country, user, updatingUser, handleUpdate, pendingCountry, navigation } = this.props;

    // Map the userCountries into an array of just the countries' names.
    const userCountries = user.countries.map(country => country.name);

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Country', {...this.props})}
      >
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
        <View style={[styles.flagContainer, {height: this.state.height}]}>
          <Image
            style={[styles.flag, {height: this.state.height}]}
            source={{uri: country.flag}}
          />
        </View>
      </TouchableOpacity>
    )
  } 
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
  flagContainer: {
    width: Layout.window.width * .95, 
  },
  flag: {
    width: Layout.window.width * .95,  
    resizeMode: 'cover'
  }
});