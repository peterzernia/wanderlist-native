import React, { Component } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Switch, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from '../components/Map';
import { authLogout } from '../actions/authActions';
import { fetchNextUserTripReports } from '../actions/tripReportActions';

export class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      switchValue: true,
      url: '',
    }
  }

  handleValueChange = (value) => {
    this.setState({switchValue: value});
    this.props.authLogout();
    this.props.navigation.navigate('Login')
  }

  renderHeader = () => {
    const {switchValue} = this.state;
    const { user, navigation, userTripReports } = this.props;

    return (
      <View style={styles.headerContainer}>
        <Switch 
          style={styles.switch}
          value={switchValue}
          onValueChange={(value) => this.handleValueChange(value)}
        />
        <View style={styles.wrapper}>
          <View style={styles.flagContainer}>
          </View>
          <View style={styles.biography}>
            <Text style={styles.usernameText}>
              {user.username}
            </Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <Text style={styles.biographyText}>
              {user.biography}
            </Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.map}>
          <Map {...this.props} />
        </View>
        <View style={styles.line}></View>
        {/* Display info message if the user has not written any Trip Reports */}
        {
          !userTripReports.results.length &&
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              It looks like you haven't written any Trip Reports yet. Once you do they'll show up here.
            </Text>
          </View>
        }
      </View>
    )
  };

  renderFooter = () => {
    const { fetchingNextUserTripReports, userTripReports } = this.props;

    if (fetchingNextUserTripReports && userTripReports.next) {
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
    fetchNextUserTripReports was being called multiple times with the same URL before the GET request. 
    returned a new URL. This fix saves the URL that was called into state, and then checks to see 
    if it has already been called.
    */
    const { url } = this.state;
    const { userTripReports, fetchNextUserTripReports } = this.props;

    if (userTripReports.next && url !== userTripReports.next) {
      fetchNextUserTripReports(userTripReports.next);
      this.setState({url: userTripReports.next});
    }
  }


  render() {
    const { fetchingUser, userTripReports } = this.props;

    // While fetchingUser is true, render a loader to prevent any errors.
    if (fetchingUser) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196f3" />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={userTripReports.results}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.tripReportText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.slug}
            ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => this.renderFooter()}
            onEndReached={() => this.handleLoadMore()}
          />
        </View>
      );
    }
  }
}


const mapState = state => {
  return {
    user: state.user.user,
    fetchingUser: state.user.fetchingUser,
    userTripReports: state.tripReport.userTripReports,
    fetchingNextUserTripReports: state.tripReport.fetchingNextUserTripReports
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogout,
    fetchNextUserTripReports,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(ProfileScreen);

ProfileScreen.propTypes = {
  authLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchingUser: PropTypes.bool.isRequired,
  userTripReports: PropTypes.object.isRequired,
  fetchingNextUserTripReports: PropTypes.bool.isRequired,
  fetchNextUserTripReports: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center'
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  switch: {
    alignSelf: 'flex-end'
  },
  wrapper: {
    flexDirection: 'row',
  },
  flagContainer: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 20,
  },
  biography: {
    flex: 1,
    justifyContent: 'space-around',
    textAlign: 'left',
    marginRight: 10,
  },
  usernameText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  editProfileButton: {
    width: 100,
    maxHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#808080",
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
  },
  biographyText: {
    fontSize: 16,
  },
  line: {
    height: 0,
    borderWidth: .3,
    width: '90%',
    marginTop: 20,
    marginBottom: 20
  },
  map: {
    height: 400,
    width: '95%',
    borderWidth: .5,
  },
  buttonContainer: {
    width: '95%',
    borderRadius: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 2,
    padding: 5,
    alignSelf: 'center'
  },
  tripReportText: {
    fontSize: 20,
    flexWrap: 'wrap',
  },
  infoTextContainer: {
    width: '95%',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  infoText: {
    textAlign: 'center',
  }
})