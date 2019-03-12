import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import { authLogin } from '../actions/authActions';

export class LoginScreen extends Component {
  handleSubmit = async (username, password) => {
    await this.props.authLogin(username, password);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticated) {
      this.props.navigation.navigate('MainLoading');
    }
  }

  render() {
    return (
      <View style={styles.loginForm}>
        <LoginForm handleSubmit={this.handleSubmit} {...this.props} />
      </View>
    );
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    authenticating: state.auth.authenticating,
  }
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogin,
  }, dispatch)
};

export default connect(mapState, mapDispatch)(LoginScreen);

LoginScreen.propTypes = {
  authLogin: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  authenticating: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  loginForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});