import React, { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Autocomplete from 'react-native-autocomplete-input';
import countries from '../countries.json';

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      hide: false,
    };
  }

  findCountry = (query) => {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'i');
    return countries.filter(country => country.name.search(regex) >= 0);
  }

  render() {

    const { query, hide } = this.state;
    const countries = this.findCountry(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const { fetchingCountries, handleSearch } = this.props;

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={hide}
          containerStyle={styles.autocompleteInput}
          inputContainerStyle={styles.textInputContainer}
          style={styles.textInput}
          data={countries.length === 1 && comp(query, countries[0].name) ? [] : countries}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text, hide: false })}
          placeholder="Search for a Country or Territory"
          renderItem={({ name }) => (
            <TouchableOpacity onPress={() => this.setState({ query: name, hide: true })}>
              <Text style={styles.queryText}>
                {name}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch(query)}
          >
            {
              fetchingCountries
              ? <ActivityIndicator size="small" color="white" />
              : <Text style={styles.buttonText}>Search</Text>
            }
        </TouchableOpacity>
      </View>
    );
  }
}

SearchBar.propType = {
  fetchingCountries: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignItems: 'center',
    margin: 10,
    marginTop: 30,
  },
  autocompleteInput: {
    width: 300,
    marginBottom: 7,
    position: 'relative',
    zIndex: 1,
  },
  textInputContainer: {
    borderWidth: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  textInput: {
    backgroundColor: 'rgba(52, 52, 52, 0)', 
    fontSize: 16
  },
  queryText: {
    fontSize: 16,
    margin: 3,
  },
  searchButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    marginRight: 5,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16
}
});