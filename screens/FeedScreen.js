import React, { Component } from 'react';
import { 
  ActivityIndicator, ScrollView, StyleSheet, 
  Text, TouchableOpacity, View 
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TripReport from '../components/TripReport';
import { fetchNextTripReports } from '../actions/tripReportActions';

export class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Feed',
  };

  render() {
    // Destructure props.
    var { tripReports, fetchingTripReports, fetchingNextTripReports, fetchNextTripReports } = this.props;

    // Map the Trip Reports into individual Trip Reports components.
    const listTripReports = tripReports.results.map(tripReport =>(
      <TripReport key={tripReport.id} {...this.props} tripReport={tripReport} />
    ));

    // Returns true if the scroll screen is within 1px from the bottom. 
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 5;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };
    
    return (
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && tripReports.next && !fetchingNextTripReports) {
            fetchNextTripReports(tripReports.next);
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={styles.container}>
          <View style={styles.sort}>
            <TouchableOpacity>
              <Text style={styles.filter}>New Posts</Text>
            </TouchableOpacity>
          </View>
          {
            // Render a loader while the Trip Reports are fetched.
            fetchingTripReports
            ? <ActivityIndicator size="large" color="#2196f3"/>
            : <View>{listTripReports}</View>
          }
          {fetchingNextTripReports && <ActivityIndicator style={{marginBottom: 10}}size="large" color="#2196f3"/>}
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    tripReports: state.tripReport.tripReports,
    fetchingTripReports: state.tripReport.fetchingTripReports,
    fetchingNextTripReports: state.tripReport.fetchingNextTripReports,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchNextTripReports,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(FeedScreen);

FeedScreen.propTypes = {
  tripReports: PropTypes.object.isRequired,
  fetchingTripReports: PropTypes.bool.isRequired,
  fetchingNextTripReports: PropTypes.bool.isRequired,
  fetchNextTripReports: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  sort: {
    height: 60,
    justifyContent: 'center',
    padding: 5
  },
  filter: {
  },
  loading: {
  }
})