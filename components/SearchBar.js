import React, { Component } from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import Autocomplete from 'react-native-autocomplete-input'
import { Ionicons } from '@expo/vector-icons'

import countries from '../countries.json'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      hide: false,
    }
  }

  findCountry = (query) => {
    if (query === '' || !query) {
      return []
    }
    const regex = new RegExp(
      `${query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`,
      'i',
    )
    return countries.filter((country) => country.name.search(regex) >= 0)
  };

  render() {
    const { query, hide } = this.state
    const countries = this.findCountry(query)
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()
    const { fetchingCountries, handleSearch } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.closeButtonContainer} />
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            hideResults={hide}
            containerStyle={styles.autocompleteInput}
            listContainerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }}
            inputContainerStyle={styles.textInputContainer}
            style={styles.textInput}
            data={
              countries.length === 1 && comp(query, countries[0].name)
                ? []
                : countries
            }
            defaultValue={query}
            onChangeText={(text) => this.setState({ query: text, hide: false })}
            placeholder="Search for a Country or Territory"
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.pk}
                onPress={() => this.setState({ query: item.name, hide: true })}
              >
                <Text style={styles.queryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={() => this.setState({ query: '' })}
          >
            {this.state.query !== '' ? <Ionicons name="md-close" size={20} /> : null}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(query)}
        >
          {fetchingCountries ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

SearchBar.propType = {
  fetchingCountries: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignItems: 'center',
    margin: 10,
    marginTop: 30,
  },
  input: {
    flexDirection: 'row',
    width: '100%',
  },
  closeButtonContainer: {
    height: 20,
    width: 20,
  },
  autocompleteInput: {
    width: 300,
    marginBottom: 7,
    position: 'relative',
    zIndex: 1,
    maxHeight: 300,
  },
  textInputContainer: {
    borderWidth: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  textInput: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    fontSize: 16,
  },
  queryText: {
    fontSize: 18,
    margin: 5,
    color: 'black',
  },
  searchButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    marginRight: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})
