import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import { authLogin } from '../actions/authActions';

export class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  handlePress = async(username, password) => {
    await this.props.authLogin(username, password);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <View>
        <LoginForm handlePress={this.handlePress}/>
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
    authLogin,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(LoginScreen);

LoginScreen.propTypes = {
  authLogin: PropTypes.func.isRequired,
};