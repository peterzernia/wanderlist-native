import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import { authLogin } from '../actions/authActions';

export class LoginScreen extends Component {
  handlePress = async(username, password) => {
    await this.props.authLogin(username, password);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticated) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <LoginForm handlePress={this.handlePress} {...this.props} />
      </View>
    );
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogin,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(LoginScreen);

LoginScreen.propTypes = {
  authLogin: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};