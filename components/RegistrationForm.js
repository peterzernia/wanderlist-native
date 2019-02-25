import React, { Component } from 'react'
import { 
  Picker, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  StyleSheet 
} from 'react-native'
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
    // Create the Picker items from a list of the countries' names and value, and add a placeholder
    // to the first position of the array.
    const pickerItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
      <Picker.Item key={country.pk} value={country.pk} label={country.name} />
    ))
    pickerItems.splice(0, 0, <Picker.Item key={0} value={0} label="Select Your Home Country" />)


    return (
      <View>
        <TextInput 
          style={styles.textInput}
          placeholder="Username"
          value={this.state.username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password1}
          onChangeText={(value) => this.setState({password1: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={this.state.password2}
          onChangeText={(value) => this.setState({password2: value})}
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.home}
          onValueChange={(value) => this.setState({home: value})}
        >
          {pickerItems}
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => this.props.handlePress(
              this.state.username, this.state.email, 
              this.state.password1, this.state.password2, this.state.home
            )}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  textInput: {
    width: 300,
    height: 50,
  },
  picker: {
    width: 300,
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
    backgroundColor: "#2196f3",
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
    color: 'white'
  }
})