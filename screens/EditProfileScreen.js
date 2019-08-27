import React, { Component } from 'react'
import { AsyncStorage, View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import EditProfileForm from '../components/EditProfileForm'
import { updateUser } from '../actions/userActions'

export class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'Edit Profile',
  };

  handleSubmit = async (username, email, home, biography) => {
    const { user, updateUser } = this.props
    const token = await AsyncStorage.getItem('token')

    // The HTTP request must contain countries as a list of ids, not country objects.
    const countries = user.countries.map((country) => country.id)
    const success = 'Your profile has been updated.'
    updateUser(token, username, email, countries, home, biography, success)
  };

  render() {
    return (
      <View style={styles.editProfileForm}>
        <EditProfileForm handleSubmit={this.handleSubmit} {...this.props} />
      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.user.user,
  updatingUser: state.user.updatingUser,
})

const mapDispatch = (dispatch) => bindActionCreators(
  {
    updateUser,
  },
  dispatch,
)

export default connect(
  mapState,
  mapDispatch,
)(EditProfileScreen)

EditProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
  updatingUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  editProfileForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
