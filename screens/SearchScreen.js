import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Results from '../components/Results';
import SearchBar from '../components/SearchBar';
import { fetchCountry } from '../actions/countryActions';

export class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  handlePress = async (country) => {
    await this.props.fetchCountry(country);
  }

  render() {
    // Map the search countries array into individual Results components.
    const listResults = this.props.searchedCountries.map(country =>(
      <Results key={country.id} {...this.props} country={country} />
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar handlePress={this.handlePress} {...this.props} />
        {listResults}
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    fetchingCountry: state.country.fetchingCountry,
    searchedCountries: state.country.country,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(SearchScreen);

SearchScreen.propTypes = {
  fetchCountry: PropTypes.func.isRequired,
  fetchingCountry: PropTypes.bool.isRequired,
  searchedCountries: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})