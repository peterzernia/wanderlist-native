import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { requestPasswordReset } from '../actions/authActions';

export class ForgotPasswordScreen extends Component {
  handlePress = async(email) => {
    await this.props.requestPasswordReset(email);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticated) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <View style={styles.loginForm}>
        <ForgotPasswordForm handlePress={this.handlePress} {...this.props} />
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
    requestPasswordReset,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(ForgotPasswordScreen);

ForgotPasswordScreen.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  loginForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})