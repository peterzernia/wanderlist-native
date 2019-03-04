import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TripReportScreen extends Component {
  render() {
    // Pull tripReport prop out of navigation parameters.
    const { tripReport } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text> {tripReport.title} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
})