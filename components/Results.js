import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Results extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.country.name}</Text>
      </View>
    )
  }
}
