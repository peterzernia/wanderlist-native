import React, { Component } from "react";
import { AsyncStorage, FlatList, StyleSheet, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Results from "../components/Results";
import SearchBar from "../components/SearchBar";
import { fetchCountries } from "../actions/countryActions";
import { updateUser } from "../actions/userActions";

export class SearchScreen extends Component {
  static navigationOptions = {
    title: "Search"
  };
  constructor() {
    super();
    this.state = {
      pendingCountry: { name: null }
    };
  }

  handleSearch = async query => {
    await this.props.fetchCountries(query);
  };

  handleUpdate = async country => {
    const { user, updateUser } = this.props;
    const token = await AsyncStorage.getItem("token");
    let newCountries;
    let success;
    this.setState({ pendingCountry: country });

    if (user.countries.length === 0) {
      newCountries = [country.id];
      success = `${country.name} has been added to your map.`;
    } else {
      newCountries = user.countries.map(country => country.id);
      if (newCountries.includes(country.id)) {
        let i = newCountries.indexOf(country.id);
        if (i !== -1) {
          newCountries.splice(i, 1);
        }
        success = `${country.name} has been removed to your map.`;
      } else {
        newCountries.push(country.id);
        success = `${country.name} has been added to your map.`;
      }
    }
    updateUser(
      token,
      user.username,
      user.email,
      newCountries,
      user.home.id,
      user.biography,
      success
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        findCountry={this.findCountry}
        handleSearch={this.handleSearch}
        {...this.props}
      />
    );
  };

  render() {
    const { pendingCountry } = this.state;
    const { countries } = this.props;

    return (
      <FlatList
        containerContentStyle={styles.container}
        data={countries}
        renderItem={({ item }) => (
          <View style={styles.results}>
            <Results
              {...this.props}
              country={item}
              handleUpdate={this.handleUpdate}
              pendingCountry={pendingCountry}
            />
          </View>
        )}
        keyExtractor={item => item.alpha2code}
        ListHeaderComponent={() => this.renderHeader()}
        removeClippedSubviews={true}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        maxToRenderPerBatch={100}
        windowSize={7}
      />
    );
  }
}

const mapState = state => {
  return {
    fetchingCountries: state.country.fetchingCountries,
    countries: state.country.countries,
    user: state.user.user,
    updatingUser: state.user.updatingUser
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      fetchCountries,
      updateUser
    },
    dispatch
  );
};

export default connect(
  mapState,
  mapDispatch
)(SearchScreen);

SearchScreen.propTypes = {
  fetchCountries: PropTypes.func.isRequired,
  fetchingCountries: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  updatingUser: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  results: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  }
});
