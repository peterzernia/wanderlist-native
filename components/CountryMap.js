import React, { Component } from "react";
import MapView, { UrlTile, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class CountryMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: props.country.latlng[0],
        longitude: props.country.latlng[1],
        latitudeDelta: 100,
        longitudeDelta: 50
      }
    };
  }

  render() {
    const { country } = this.props;
    const { region } = this.state;

    return (
      <MapView
        style={styles.map}
        region={region}
        mapType="none" //{Platform.OS == "android" ? "none" : "standard"}
        rotateEnabled={false}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={0}
          maximumZ={19}
        />
        <Marker
          key={country.id}
          coordinate={{
            latitude: country.latlng[0],
            longitude: country.latlng[1]
          }}
          title={country.name}
        />
      </MapView>
    );
  }
}

CountryMap.propTypes = {
  country: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -27
  }
});
