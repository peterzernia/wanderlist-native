import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import NewPostForm from '../components/NewPostForm';

export default class NewPostScreen extends Component {
  static navigationOptions = {
    title: 'New Trip Report',
  };

  handlePress = (title, content, selectedCountries) => {
    console.log(title, content, selectedCountries);
  }

  render() {
    return (
      <View style={styles.container}>
        <NewPostForm handlePress={this.handlePress} {...this.props}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})

NewPostScreen.propTypes = {

}