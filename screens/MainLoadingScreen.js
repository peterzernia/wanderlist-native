import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { REACT_APP_API_URL } from 'react-native-dotenv';

import { fetchTripReports, fetchUserTripReports } from '../actions/tripReportActions';
import { fetchUser } from '../actions/userActions';

export class MainLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync()
      .catch(err => {
        console.log(err);
});
  }

  _bootstrapAsync = async () => {
    // Initial load for App data.
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    await this.props.fetchUser(token);
    await this.props.fetchTripReports(`${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`);
    await this.props.fetchUserTripReports(username);
    this.props.navigation.navigate('Main');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchUser,
    fetchUserTripReports,
    fetchTripReports,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(MainLoadingScreen);

MainLoadingScreen.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  fetchUserTripReports: PropTypes.func.isRequired,
  fetchTripReports: PropTypes.func.isRequired,
};