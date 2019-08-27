import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostForm from '../components/PostForm'
import PostTitleHeader from '../components/PostTitleHeader'
import { setState } from '../actions/globalActions'

// PostScreen is used for new posts and to edit posts. If there are no params in
// navigiation.state, then a new post is being made.
export class PostScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    if (params) {
      return {
        title: 'Edit Trip Report',
        headerTitle: <PostTitleHeader {...params} navigation={navigation} />,
      }
    }
    return {
      title: 'New Trip Report',
      headerTitle: <PostTitleHeader navigation={navigation} />,
    }
  };

  render() {
    let tripReport
    if (this.props.navigation.state.params) {
      tripReport = this.props.navigation.state.params.tripReport
    }

    return (
      <View style={styles.container}>
        <PostForm
          {...this.props}
          handlePress={this.handlePress}
          tripReport={tripReport}
        />
      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.user.user,
  globalState: state.global.globalState,
})

const mapDispatch = (dispatch) => bindActionCreators(
  {
    setState,
  },
  dispatch,
)

export default connect(
  mapState,
  mapDispatch,
)(PostScreen)

PostScreen.propTypes = {
  user: PropTypes.object.isRequired,
  globalState: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
