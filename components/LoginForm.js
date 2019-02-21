import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

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
          placeholder="username"
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
        />
        <TextInput 
          placeholder="password"
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
        />
        <Button 
          title="Login" 
          onPress={() => this.props.handlePress(this.state.username, this.state.password)}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

})