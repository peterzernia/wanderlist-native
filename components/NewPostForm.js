import React, { Component } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MultiSelect from 'react-native-multiple-select';
import countries from '../countries.json';

export default class NewPostForm extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      email:'',
      selectedCountries: [],
    };
  }

  render() {
    // Create the Picker items from a list of the countries' names and value, and add a placeholder
    // to the first position of the array.
    const items = [...countries].sort((a, b) => a.name > b.name).map(country => (
      {id: `${country.pk}`, name: country.name}
    ))

    const { posting, handlePress, navigation } = this.props;
    const { title, content, selectedCountries } = this.state;

    return (
      <ScrollView 
        style={{backgroundColor: 'white', width: '100%'}}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TextInput 
              style={styles.textInput}
              placeholder="Title"
              value={title}
              onChangeText={(value) => this.setState({title: value})}
            />
          </View>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={(selectedCountries) => this.setState({selectedCountries})}
            selectedItems={selectedCountries}
            selectText="Select Countries"
            searchInputPlaceholderText="Search Countries"
            displayKey="name"
            itemFontSize={16}
            searchInputStyle={{fontSize: 16}}
            fontSize={16}
            textColor='#CCC'
            hideSubmitButton
          />
          <View>
            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedCountries)}
          </View>
          <TextInput 
            style={styles.textField}
            placeholder="Content"
            value={content}
            multiline={true}
            onChangeText={(value) => this.setState({content: value})}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => {
                handlePress(title, content, selectedCountries);
                navigation.navigate('Feed');
              }}
            >
              {
                posting
                ? <ActivityIndicator size="small" color="white" />
                : <Text style={styles.text}>Post</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

NewPostForm.propTypes = {
  posting: PropTypes.bool.isRequired,
  handlePress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: '100%'
  },
  titleContainer: {
    borderBottomWidth: .5,
    borderColor: '#CCC',
    marginBottom: 10,
    marginTop: 10
  },
  textInput: {
    height: 50,
    fontSize: 16,
  },
  textField: {
    height: 300,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center'
  },
  postButton: {
    maxWidth: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});