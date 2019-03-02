import React, { Component } from 'react';
import { AsyncStorage, Alert, ScrollView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Results from '../components/Results';
import SearchBar from '../components/SearchBar';
import { fetchCountry } from '../actions/countryActions';
import { updateUser } from '../actions/userActions';

export class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  handleSearch = async (country) => {
    await this.props.fetchCountry(country);
  }

  handleUpdate = async (country) => {
    const { user, updateUser } = this.props;
    const token = await AsyncStorage.getItem('token');
    let newCountries;
    let success;

    if (user.countries.length === 0) {
      newCountries = [country.id];
    } else {
      newCountries = user.countries.map(country => country.id)
      if (newCountries.includes(country.id)) {
        let i = newCountries.indexOf(country.id);
        if (i !== -1){ 
          newCountries.splice(i, 1);
        }
        success = `${country.name} has been removed to your map.`
      } else {
        newCountries.push(country.id)
        success = `${country.name} has been added to your map.`
      }
    }
    updateUser(token, user.username, user.email, newCountries, user.home.id, user.biography, success);
  }

  render() {
    // Map the search countries array into individual Results components.
    const listResults = this.props.searchedCountries.map(country =>(
      <Results 
        key={country.id} 
        {...this.props} 
        country={country} 
        handleUpdate={this.handleUpdate}
      />
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar handleSearch={this.handleSearch} {...this.props} />
        {listResults}
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    fetchingCountry: state.country.fetchingCountry,
    searchedCountries: state.country.country,
    user: state.user.user,
    updatingUser: state.user.updatingUser,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
    updateUser,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(SearchScreen);

SearchScreen.propTypes = {
  fetchCountry: PropTypes.func.isRequired,
  fetchingCountry: PropTypes.bool.isRequired,
  searchedCountries: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  updatingUser: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})