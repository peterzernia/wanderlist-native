import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading',
});