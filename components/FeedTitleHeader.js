import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class FeedTitleHeader extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  render() {
    const { handleSearch } = this.props;
    const { query } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={query}
            onChangeText={(value) => this.setState({query: value})} 
            placeholder="Search for a Country or User"
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleSearch(query)}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }  
}

FeedTitleHeader.propType = {
  handleSearch: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputContainer: {
    flexDirection: 'row',
    width: '75%',
    height: 30,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    width: '75%',
    borderRadius: 5,
    padding: 5
  },
  buttonContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    flex: 1,
    marginLeft: 5,
    borderRadius: 10
  },
  buttonText: {
    color: 'white'
  }
})