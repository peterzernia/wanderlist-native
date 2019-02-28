import React, { Component } from 'react';
import { 
  ActivityIndicator, FlatList, ScrollView, StyleSheet, 
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

  renderHeader = () => {
    return (
      <View style={styles.sort}>
        <TouchableOpacity>
          <Text style={styles.filter}>New Posts</Text>
        </TouchableOpacity>
      </View>
    )
  };

  renderFooter = () => {
    if (!this.props.fetchingNextTripReports) return null;
    return (
      <View style={{marginBottom: 10}}>
        <ActivityIndicator size="large" color="#2196f3"/>
      </View>
    );
  };

  handleLoadMore = () => {
    if (this.props.tripReports.next) {
      this.props.fetchNextTripReports(this.props.tripReports.next);
    }
  }

  render() {
    // Destructure props.
    var { tripReports, fetchingTripReports } = this.props;

    return (
      <View>
        {
          // Render a loader while the Trip Reports are fetched.
          fetchingTripReports
          ? <ActivityIndicator size="large" color="#2196f3"/>
          : <FlatList
              data={tripReports.results}
              renderItem={({ item }) => (
                <TripReport
                  key={item.id} 
                  tripReport={item}
                  {...this.props} 
                />
              )}
              ListHeaderComponent={this.renderHeader()}
              ListFooterComponent={this.renderFooter()}
              onEndReached={this.handleLoadMore()}
              onEndReachedThreshold={0}
            />
        }
      </View>
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