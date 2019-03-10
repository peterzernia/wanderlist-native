import React, { Component } from 'react';
import { ActivityIndicator, Picker, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';
import countries from '../countries.json';

export default class RegistrationForm extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      email:'',
      password1: '',
      password2: '',
      home: 0,
    };
  }

  render() {
    // Create the Picker items from a list of the countries' names and value, and add a placeholder
    // to the first position of the array.
    const pickerItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
      <Picker.Item key={country.pk} value={country.pk} label={country.name} />
    ))
    pickerItems.splice(0, 0, <Picker.Item key={0} value={0} label="Select Your Home Country" />)

    const { authenticating, handleSubmit, navigation } = this.props;
    const { username, email, password1, password2, home } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput}
          placeholder="Username"
          value={username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password1}
          onChangeText={(value) => this.setState({password1: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={password2}
          onChangeText={(value) => this.setState({password2: value})}
        />
        <Picker
          style={styles.picker}
          selectedValue={home}
          onValueChange={(value) => this.setState({home: value})}
        >
          {pickerItems}
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => handleSubmit(username, email, password1, password2, home)}
          >
            {
              authenticating
              ? <ActivityIndicator size="small" color="white" />
              : <Text style={styles.text}>Register</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

RegistrationForm.propTypes = {
  authenticating: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 50,
    fontSize: 16,
    paddingLeft: 7
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  registerButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  loginButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    flex: 1,
    marginLeft: 5,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});