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

  constructor() {
    super();
    this.state = {
      url: ''
    }
  }

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
    /* 
    fetchNextTripReports was being called multiple times with the same URL. This fix saves the
    URL that was called into state, and then checks to see if it has already been called.
    */
    if (this.props.tripReports.next && this.state.url !== this.props.tripReports.next) {
      this.props.fetchNextTripReports(this.props.tripReports.next);
      this.setState({url: this.props.tripReports.next});
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
              onEndReachedThreshold={0.5}
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