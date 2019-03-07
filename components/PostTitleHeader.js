import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {  postTripReport, updateTripReport } from '../actions/tripReportActions';


export class PostTitleHeader extends Component {

  // handlePress updates or posts a Trip Report depending on if there is a Trip Report in params.
  handlePress = async (title, content, selectedCountries) => {
    const { user, tripReport, postTripReport, updateTripReport } = this.props;
    const token = await AsyncStorage.getItem('token');
    const countries = selectedCountries.map(id =>  Math.trunc(id));

    if (countries.length) {
      if (tripReport) {
        updateTripReport(token, tripReport.id, user.pk, title, content, countries);
      } else {
        postTripReport(token, user.pk, title, content, countries);
      }
    } else {
      Alert.alert('Error', 'Countries: This field is required.')
    }
  }

  render() {
    const { tripReport, globalState, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          {
            tripReport
            ? <Text style={styles.titleText}>Edit Trip Report</Text>
            : <Text style={styles.titleText}>New Trip Report</Text>
          }
        </View>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => {
            this.handlePress(globalState.title, globalState.content, globalState.selectedCountries);
            navigation.goBack(null);
          }}
        >
          {
            tripReport
            ? <Text style={styles.buttonText}>Update</Text>
            : <Text style={styles.buttonText}>Post</Text>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

const mapState = state => {
  return {
    globalState: state.global.globalState,
    user: state.user.user,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    postTripReport,
    updateTripReport,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(PostTitleHeader);

PostTitleHeader.propTypes = {
  tripReport: PropTypes.object,
  globalState: PropTypes.object,
  postTripReport: PropTypes.func.isRequired,
  updateTripReport: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginRight: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold'
  }
})