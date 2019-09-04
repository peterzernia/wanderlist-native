import React, { Component } from 'react'
import {
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

// The TripReportTitleHeader component is used in the navigation header on the TripReportScreen.
export default class TripReportTitleHeader extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
    }
  }

  render() {
    const {
      tripReport, user, handleDelete, navigation,
    } = this.props

    // If the author of the post is the authenticated user, render the modal for deleting and editing the post.
    if (tripReport.author.pk === user.pk) {
      return (
        <View style={styles.container}>
          {/* 'more-vert' icon is displayed in the right hand corner, and onPress opens modal. */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ modalVisible: true })}
            >
              <Ionicons name="md-more" size={25} />
            </TouchableOpacity>
          </View>
          {/* Modal */}
          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false })
            }}
          >
            {/* A TouchableOpacity that is transparent fills the entire screen to close the modal. */}
            <TouchableOpacity
              style={{ width: '100%', height: '100%' }}
              activeOpacity={1}
              onPressOut={() => this.setState({ modalVisible: false })}
            >
              {/* A TouchableWithoutFeedback is displayed on the modal to block the higher order TouchableOpacity's onPress */}
              <TouchableWithoutFeedback>
                <View style={styles.modal}>
                  <View>
                    {/* Modal renders a button to edit and a button to delete the Trip Report. */}
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisible: false })
                        navigation.navigate('Post', { ...this.props })
                      }}
                    >
                      <View style={styles.modalButtonContainer}>
                        <Ionicons name="md-create" size={25} />
                        <Text style={styles.modalText}> Edit</Text>
                      </View>
                    </TouchableOpacity>
                    {/* Close the modal, delete the post, and navigate to the Feed page on confirm delete. */}
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Confirm Delete',
                          'Are you sure you want to delete this post?',
                          [
                            {
                              text: 'OK',
                              onPress: () => {
                                this.setState({ modalVisible: false })
                                navigation.goBack(null)
                                handleDelete(tripReport)
                              },
                            },
                            { text: 'Cancel' },
                          ],
                        )
                      }}
                    >
                      <View style={styles.modalButtonContainer}>
                        <Ionicons name="md-trash" size={25} />
                        <Text style={styles.modalText}> Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </View>
      )
    }
    // If the author of the post is not the authenticated user, render null.
    return null
  }
}

TripReportTitleHeader.propTypes = {
  tripReport: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  button: {
    marginRight: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 150,
    height: 100,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    elevation: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  modalText: {
    fontSize: 16,
  },
})
