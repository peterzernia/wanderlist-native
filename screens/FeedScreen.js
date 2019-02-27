import React, { Component } from 'react';
import { 
  ActivityIndicator, ScrollView, StyleSheet, 
  Text, TouchableOpacity, View 
} from 'react-native';
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

    // Destructure props.
    var { fetchingTripReports } = this.props;
    return (
      <ScrollView>
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
        </View>
      </ScrollView>
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
    justifyContent: 'center'
  },
  sort: {
    height: 60,
  },
  filter: {
    margin: 5
  },
  loading: {
  }
})