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
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput}
          placeholder="Search for a Country or Territory"
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
  container: {
    width: 300,
    alignItems: 'center',
    margin: 10
  },
  textInput: {
    width: 300,
    height: 50,
    borderColor: 'black',
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 7
  },
  searchButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    marginRight: 5,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 16
  }
})