import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ForgotPasswordForm from '../components/ForgotPasswordForm'
import { requestPasswordReset } from '../actions/authActions'

export class ForgotPasswordScreen extends Component {
  handleSubmit = async (email) => {
    await this.props.requestPasswordReset(email)
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticated) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <View style={styles.forgotPasswordForm}>
        <ForgotPasswordForm handleSubmit={this.handleSubmit} {...this.props} />
      </View>
    )
  }
}

const mapState = (state) => ({
  authenticated: state.auth.authenticated,
  authenticating: state.auth.authenticating,
})

const mapDispatch = (dispatch) => bindActionCreators(
  {
    requestPasswordReset,
  },
  dispatch,
)

export default connect(
  mapState,
  mapDispatch,
)(ForgotPasswordScreen)

ForgotPasswordScreen.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  authenticating: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  forgotPasswordForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
