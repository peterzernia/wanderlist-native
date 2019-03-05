import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import TripReportFooter from '../components/TripReportFooter';
import TripReportHeader from '../components/TripReportHeader';
import TripReportTitle from '../components/TripReportTitle';

// TripReportScreen displays the full text of the Trip Reports.
export default class TripReportScreen extends Component {
  
  // Custom headerTitle component.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return { headerTitle: <TripReportTitle {...params} /> }
  };

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