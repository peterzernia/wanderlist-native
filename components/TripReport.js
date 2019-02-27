import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TripReport extends Component {
  render() {
    return (
      <View>
        <Text> {this.props.tripReport.title} </Text>
      </View>
    )
  }
}
