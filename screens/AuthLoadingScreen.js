import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync()
      .catch(err => {
        console.log(err);
});
  }

  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate('Auth')
    //this.props.navigation.navigate(token ? 'Main' : 'Auth');
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