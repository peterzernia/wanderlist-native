import React, { Component } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: ''
    };
  }

  render() {
    var { fetchingCountry } = this.props;
    return (
      <View>
        <TextInput 
          style={styles.textInput}
          placeholder="Search for a country"
          value={this.state.country}
          onChangeText={(value) => this.setState({country: value})}
        />
        <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.props.handlePress(this.state.country)}
          >
            {
              fetchingCountry
              ? <ActivityIndicator size="small" color="white" />
              : <Text style={styles.text}>Search</Text>
            }
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {

  },
  searchButton: {

  },
  text: {

  }
})