import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditProfileForm from '../components/EditProfileForm';

export class EditProfileScreen extends Component {
  handlePress = async (username, password) => {
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
  }
};

const mapDispatch = dispatch => {
  return bindActionCreators({
  }, dispatch)
};

export default connect(mapState, mapDispatch)(EditProfileScreen);

EditProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  editProfileForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});