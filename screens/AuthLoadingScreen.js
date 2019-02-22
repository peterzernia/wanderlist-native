import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authCheckState } from '../actions/authActions';

export class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync()
      .catch(err => {
        console.log(err);
});
  }

  _bootstrapAsync = async () => {
    this.props.authCheckState();
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    this.props.navigation.navigate(token === null ? 'Auth' : 'Main');
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
    authCheckState,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(AuthLoadingScreen);

AuthLoadingScreen.propTypes = {
  authCheckState: PropTypes.func.isRequired,
};