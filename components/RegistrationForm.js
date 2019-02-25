import React, { Component } from 'react'
import { View, TextInput, Button, Picker, StyleSheet } from 'react-native'
import countries from '../countries.json'

export default class RegistrationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email:'',
      password1: '',
      password2: '',
      home: 0,
    };
  }

  handlePress = async(username, email, password1, password2, home) => {
    await this.props.authRegister(username, email, password1, password2, home);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    const pickerItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
      <Picker.Item key={country.pk} value={country.pk} label={country.name} />
    ))

    pickerItems.splice(0, 0, <Picker.Item key={0} value={0} label="Select your home country" />)


    return (
      <View>
        <TextInput 
          placeholder="Username"
          value={this.state.username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput 
          placeholder="Email"
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput 
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password1}
          onChangeText={(value) => this.setState({password1: value})}
        />
        <TextInput 
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={this.state.password2}
          onChangeText={(value) => this.setState({password2: value})}
        />
        <Picker
          selectedValue={this.state.home}
          style={{height: 50, width: 100}}
          onValueChange={(value) => this.setState({home: value})}
        >
          {pickerItems}
        </Picker>
        <Button 
          title="Register" 
          onPress={() => this.props.handlePress(
            this.state.username, this.state.email, 
            this.state.password1, this.state.password2, this.state.home
          )}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

})