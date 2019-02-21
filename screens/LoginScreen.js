import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  handlePress(username, password){
    console.log(username, password);
  }

  render() {
    return (
      <View>
        <LoginForm handlePress={this.handlePress}/>
      </View>
    );
  }
}

