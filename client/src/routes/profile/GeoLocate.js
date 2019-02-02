import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

class GeoLocate extends Component {
  state = {
    time: Date.now(),
  };

  // update every 3 seconds
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 3000);
  }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // componentDidUpdate() {
  //   console.log('It Updated');
  // }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <table>
        <tbody>
          <tr>
            <td>latitude</td>
            <td>{this.props.coords.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td>
            <td>{this.props.coords.longitude}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(GeoLocate);
