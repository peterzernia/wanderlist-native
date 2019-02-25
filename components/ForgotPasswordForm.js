import React, { Component } from 'react'
import { 
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class ForgotPasswordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Enter your email and we'll send you a link to reset your password.
        </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={() => this.props.handlePress(this.state.email)}
          >
            <Text style={styles.text}>Send Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 300
  },
  infoText: {
    textAlign: 'center'
  },
  textInput: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  passwordButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  cancelButton: {
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