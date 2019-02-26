import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const token = await AsyncStorage.getItem('token');
    await this.props.fetchUser(token);
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
  }, dispatch)
}

export default connect(mapState, mapDispatch)(MainLoadingScreen);

MainLoadingScreen.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};