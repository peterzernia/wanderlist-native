import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Picker, StyleSheet, View } from 'react-native';
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
      url: '',
      sortURL: '/api/v1/reports/?ordering=-pk'
    }
  }

  renderHeader = () => {
    const { fetchTripReports } = this.props;
    const { sortURL } = this.state;
    return (
      <View style={styles.sort}>
        <Picker
          style={styles.picker}
          selectedValue={sortURL}
          onValueChange={(value) => {
            this.setState({sortURL: value}); 
            fetchTripReports(`${REACT_APP_API_URL}${value}`);
        }}>
          <Picker.Item key={0} value='/api/v1/reports/?ordering=-pk' label='New Posts' />
          <Picker.Item key={1} value='/api/v1/reports/' label='Best Posts' />
        </Picker>
      </View>
    )
  };

  renderFooter = () => {
    const { fetchingNextTripReports, tripReports } = this.props;

    if (fetchingNextTripReports && tripReports.next) {
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
   const { url } = this.state;
   const { tripReports, fetchNextTripReports } = this.props;

    if (tripReports.next && url !== tripReports.next) {
      fetchNextTripReports(tripReports.next);
      this.setState({url: tripReports.next});
    }
  }

  render() {
    var { tripReports, fetchTripReports, fetchingTripReports } = this.props;
    const { sortURL } = this.state;

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
          keyExtractor={item => item.slug}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
          refreshing={fetchingTripReports}
          onRefresh={() => fetchTripReports(`${REACT_APP_API_URL}${sortURL}`)}
          onEndReached={() => this.handleLoadMore()}
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
  },
  picker: {
    width: 145,
  }
})