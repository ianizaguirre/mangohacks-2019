import React, { Component, Fragment } from 'react';
import { geolocated } from 'react-geolocated';
import UserLocation from './UserLocation';

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
      <Fragment>
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
        <UserLocation lat={this.props.coords.latitude} long={this.props.coords.longitude} />
      </Fragment>
    ) : (
      <Fragment>
        <div>Getting the location data&hellip; </div>
      </Fragment>
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
