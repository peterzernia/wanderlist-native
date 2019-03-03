import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const FeedStack = createStackNavigator({
  Links: FeedScreen,
}); 

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Settings: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  FeedStack,
  ProfileStack,
  SearchStack,
  // FeedStack,
  // SearchStack,
  // ProfileStack,
});
