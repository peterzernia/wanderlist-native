import React, { Component } from 'react'
import { 
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
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
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.handlePress(this.state.username, this.state.password)}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text>Register</Text>
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
  buttonContainer: {
    flexDirection: 'row'
  },
  loginButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  registerButton: {
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