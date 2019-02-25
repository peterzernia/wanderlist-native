import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  ForgotPassword: ForgotPasswordScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading',
});