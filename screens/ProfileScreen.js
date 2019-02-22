import React, { Component } from 'react';
import { View, Switch, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authLogout } from '../actions/authActions';

export class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props){
    super(props);
    this.state = {
      switchValue: false
    }
  }

  handleValueChange = (value) => {
    this.setState({switchValue: value});
    this.props.authLogout();
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View>
        <Switch 
          value={this.state.switchValue}
          onValueChange={(value) => this.handleValueChange(value)}
        />
        {this.props.authenticated ? <Text>Authenticated</Text> : <Text>Not Authenticated</Text>}
      </View>
    );
  }
}


const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogout,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(ProfileScreen);

ProfileScreen.propTypes = {
  authLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};