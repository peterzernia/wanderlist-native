import React, { Component } from 'react';
import { Alert, AsyncStorage, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewPostForm from '../components/NewPostForm';
import { postTripReport } from '../actions/tripReportActions';

export class NewPostScreen extends Component {
  static navigationOptions = {
    title: 'New Trip Report',
  };

  handlePress = async (title, content, selectedCountries) => {
    const { user, postTripReport } = this.props;
    const token = await AsyncStorage.getItem('token');
    const countries = selectedCountries.map( id =>  Math.trunc(id) );
    if (countries.length) {
      postTripReport(token, user.pk, title, content, countries);
    } else {
      Alert.alert('Error', 'Countries: This field is required.')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NewPostForm {...this.props} handlePress={this.handlePress} />
      </View>
    );
  }
}

const mapState = state => {
  return {
    posting: state.tripReport.posting,
    user: state.user.user,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    postTripReport,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(NewPostScreen);

NewPostScreen.propTypes = {
  postTripReport: PropTypes.func.isRequired,
  posting: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});