import React, { Component } from 'react'
import { 
  ActivityIndicator,
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
    const { authenticating, handlePress, navigation } = this.props;
    const { username, password } = this.state;
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
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handlePress(username, password)}
          >
          {
            authenticating
            ? <ActivityIndicator size="small" color="white" />
            : <Text style={styles.text}>Login</Text>
          }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{ fontSize: 16 }}>Register</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={styles.passwordButton}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={{ fontSize: 16 }}>Forgot Password?</Text>
          </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 300
  },
  textInput: {
    height: 50,
    fontSize: 16
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
  passwordButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    marginRight: 5,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 16
  }
})