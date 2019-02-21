import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
}
