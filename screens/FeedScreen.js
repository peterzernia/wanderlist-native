import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TripReport from '../components/TripReport';

export class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Feed',
  };

  render() {
    // Map the Trip Reports into individual Trip Reports components.
    const listTripReports = this.props.tripReports.results.map(tripReport =>(
      <TripReport key={tripReport.id} {...this.props} tripReport={tripReport} />
    ));

    var { fetchingTripReports } = this.props;
    return (
      <View>
        {
          // Render a loader while the Trip Reports are fetched.
          fetchingTripReports
          ? <ActivityIndicator size="small" color="#2196f3" />
          : <View>{listTripReports}</View>
        }
      </View>
    );
  }
}

const mapState = state => {
  return {
    tripReports: state.tripReport.tripReports,
    fetchingTripReports: state.tripReport.fetchingTripReports,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapState, mapDispatch)(FeedScreen);

FeedScreen.propTypes = {
  tripReports: PropTypes.object.isRequired,
  fetchingTripReports: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})