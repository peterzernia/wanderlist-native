import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateUser } from '../actions/userActions';
import EditProfileForm from '../components/EditProfileForm';

export class EditProfileScreen extends Component {
  handlePress = async (username, email, home, biography) => {
    const token = await AsyncStorage.getItem('token');
    const countries = this.props.user.countries.map(country => country.id);
    const success = 'Your profile has been updated.';
    this.props.updateUser(token, username, email, countries, home, biography, success);
  }

  render() {
    return (
      <View style={styles.editProfileForm}>
        <EditProfileForm handlePress={this.handlePress} {...this.props} />
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    updatingUser: state.user.updatingUser,
    updatedUser: state.user.updatedUser,
  }
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    updateUser,
  }, dispatch)
};

export default connect(mapState, mapDispatch)(EditProfileScreen);

EditProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
  updatingUser: PropTypes.bool.isRequired,
  updatedUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  editProfileForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});