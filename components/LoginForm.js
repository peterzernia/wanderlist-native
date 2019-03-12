import React, { Component } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    const { authenticating, handleSubmit, navigation } = this.props;
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={username}
          onChangeText={value => this.setState({ username: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={value => this.setState({ password: value })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleSubmit(username, password)}
          >
            {authenticating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.text}>Login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ fontSize: 16 }}>Register</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={{ fontSize: 16 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginForm.propTypes = {
  authenticating: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    elevation: 10
  },
  textInput: {
    height: 50,
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: "row"
  },
  loginButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.appBlue,
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  registerButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
    marginLeft: 5,
    borderRadius: 10
  },
  passwordButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginRight: 5,
    borderRadius: 10
  },
  text: {
    color: "white",
    fontSize: 16
  }
});
