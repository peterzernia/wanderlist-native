import React, { Component } from 'react'
import { 
  Button,
  Text,
  TextInput,
  StyleSheet,
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
          placeholder="Username"
          value={this.state.username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput 
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <Button 
          title="Login" 
          onPress={() => this.props.handlePress(this.state.username, this.state.password)}
        />
        <Text>Don't have an account?</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Register')}
          title="Register"
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

})