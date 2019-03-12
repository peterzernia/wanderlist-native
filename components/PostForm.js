import React, { Component } from 'react';
import { TextInput, View, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MultiSelect from 'react-native-multiple-select';

import countries from '../countries.json';

/** 
 * Global setState function used to pass the data from PostForm
 * to PostTitleHeader, where the actual post/update function call
 * is made.
**/
export default class PostForm extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      content:'',
      selectedCountries: [],
    };
  }

  componentDidMount() {
    // If the tripReport is not null (i.e. we're editing a post), setState with the
    // values from the tripReport to fill the forms.
    const { tripReport, setState } = this.props;
    setState({ // Set the initial globalState.
      title: '',
      content:'',
      selectedCountries: [],
    });
    if (tripReport) {
      var countries = tripReport.countries.map(country => (
        country.id
      ));
      countries = countries.map(String);
      this.setState({
        title: tripReport.title,
        content: tripReport.content,
        selectedCountries: countries
      });
      setState(this.state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Set local state and globalState whenever the component updates.
    const { setState } = this.props;
    setState(this.state);
  }

  render() {
    // Create the Picker items from a list of the countries' names and value, and add a placeholder
    // to the first position of the array.
    const items = [...countries].sort((a, b) => a.name > b.name).map(country => (
      {id: `${country.pk}`, name: country.name}
    ))

    const { setState } = this.props;
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
              // Set local state and globalState.
              onChangeText={(value) => {
                this.setState({title: value});
                setState(this.state);
              }}
            />
          </View>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={(selectedCountries) => {
              this.setState({selectedCountries});
              setState(this.state);
            }}
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
            onChangeText={(value) => {
              this.setState({content: value});
              setState(this.state);
            }}
          />
        </View>
      </ScrollView>
    )
  }
}

PostForm.propTypes = {
  globalState: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
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
    marginTop: 5,
    height: 'auto',
    minHeight: 250,
    fontSize: 16,
    textAlignVertical: 'top'
  },
});