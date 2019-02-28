import React, { Component } from 'react';
import { 
  ActivityIndicator, FlatList, ScrollView, StyleSheet, 
  Text, TouchableOpacity, View 
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { REACT_APP_API_URL } from 'react-native-dotenv';

import TripReport from '../components/TripReport';
import { fetchTripReports, fetchNextTripReports } from '../actions/tripReportActions';

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
    if (this.props.fetchingNextTripReports && this.props.tripReports.next) {
      return (
        <View style={{marginBottom: 10}}>
          <ActivityIndicator size="large" color="#2196f3"/>
        </View>
      );
    } else {
      return null;
    }
  };

  handleLoadMore = () => {
    /* 
    fetchNextTripReports was being called multiple times with the same URL before the GET request. 
    returned a new URL. This fix saves the URL that was called into state, and then checks to see 
    if it has already been called.
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
      <View style={styles.container}>
        <FlatList
          data={tripReports.results}
          renderItem={({ item }) => (
            <TripReport
              key={item.id} 
              tripReport={item}
              {...this.props} 
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader()}
          ListFooterComponent={this.renderFooter()}
          refreshing={fetchingTripReports}
          onRefresh={() => this.props.fetchTripReports(`${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`)}
          onEndReached={this.handleLoadMore()}
          onEndReachedThreshold={0}
        />
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
    fetchTripReports,
    fetchNextTripReports,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(FeedScreen);

FeedScreen.propTypes = {
  tripReports: PropTypes.object.isRequired,
  fetchingTripReports: PropTypes.bool.isRequired,
  fetchingNextTripReports: PropTypes.bool.isRequired,
  fetchTripReports: PropTypes.func.isRequired,
  fetchNextTripReports: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%'
  },
  sort: {
    height: 60,
    justifyContent: 'center',
    padding: 5
  }
})