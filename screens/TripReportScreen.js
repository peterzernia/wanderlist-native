import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TripReportFooter from '../components/TripReportFooter';
import TripReportHeader from '../components/TripReportHeader';
import TripReportTitleHeader from '../components/TripReportTitleHeader';
import { deleteTripReport } from '../actions/tripReportActions';

// TripReportScreen displays the full text of the Trip Reports.
export class TripReportScreen extends Component {
  
  // Custom headerTitle component.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return { 
      headerTitle: 
        <TripReportTitleHeader 
          {...params} 
          handleDelete={navigation.getParam('handleDelete')} 
        /> 
    }
  };

  // Set handleDelete() as a parameter to pass into TripReportTitle.
  componentDidMount() {
    this.props.navigation.setParams({ handleDelete: this.handleDelete });
  }

  handleDelete = async (tripReport) => {
    const { deleteTripReport } = this.props;
    const token = await AsyncStorage.getItem('token');
    deleteTripReport(token, tripReport);
  }

  render(){
    // Pull tripReport prop out of navigation parameters.
    const { tripReport } = this.props.navigation.state.params;

    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <TripReportHeader {...this.props.navigation.state.params} />
          <View style={styles.body}>
            <Text>
              {tripReport.content}
            </Text>
          </View>
          <TripReportFooter {...this.props.navigation.state.params} />
        </View>
      </ScrollView>
    )
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    deleteTripReport,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(TripReportScreen);

TripReportScreen.propTypes = {
  deleteTripReport: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
})