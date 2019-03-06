import React, { Component } from 'react';
import { Alert, AsyncStorage, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostForm from '../components/PostForm';
import PostTitleHeader from '../components/PostTitleHeader';
import { postTripReport, updateTripReport } from '../actions/tripReportActions';

// PostScreen is used for new posts and to edit posts. If there are no params in 
// navigiation.state, then a new post is being made.
export class PostScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params) {
      return { 
        title: 'Edit Trip Report', 
        headerTitle: <PostTitleHeader {...params} handleDelete={navigation.getParam('handleDelete')} /> 
      }
    } else {
      return { 
        title: 'New Trip Report', 
        headerTitle: <PostTitleHeader handlePress={navigation.getParam('handlePress')} /> 
      }
    }
  };

  // Set handlePress() as a parameter to pass into TripReportTitle.
  componentDidMount() {
    this.props.navigation.setParams({ handlePress: this.handlePress });
  }

  handlePress = async (title, content, selectedCountries) => {
    // handlePress updates or posts a Trip Report depending on if there is a Trip Report in params.
    const { user, postTripReport, updateTripReport } = this.props;
    const token = await AsyncStorage.getItem('token');
    const countries = selectedCountries.map(id =>  Math.trunc(id));
    if (countries.length) {
      if (this.props.navigation.state.params) {
        const { tripReport } = this.props.navigation.state.params;
        updateTripReport(token, tripReport.id, user.pk, title, content, countries);
      } else {
        postTripReport(token, user.pk, title, content, countries);
      }
    } else {
      Alert.alert('Error', 'Countries: This field is required.')
    }
  }

  render() {
    var tripReport;
    if (this.props.navigation.state.params) {
      tripReport = this.props.navigation.state.params.tripReport;
    }

    return (
      <View style={styles.container}>
        <PostForm {...this.props} handlePress={this.handlePress} tripReport={tripReport} />
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
    updateTripReport,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(PostScreen);

PostScreen.propTypes = {
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