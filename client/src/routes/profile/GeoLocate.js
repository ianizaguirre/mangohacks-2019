import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { geolocated } from 'react-geolocated';
import UserLocation from './UserLocation';

const Table = styled.table`
  padding: 20px;
  box-shadow: 0 1px 1px 0 rgba(34, 45, 57, 0.05);
  border: 1px solid #d5dce3;
  border-radius: 10px;
`;

const TD = styled.td`
  padding: 5px;
  color: ${props => (props.heading ? '#222d39' : '#3e4854')};
  font-size: ${props => (props.heading ? '19px' : '13px')};
`;

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
        <Table>
          <tbody>
            <tr>
              <TD heading>latitude</TD>
              <TD>{this.props.coords.latitude}</TD>
            </tr>
            <tr>
              <TD heading>longitude</TD>
              <TD>{this.props.coords.longitude}</TD>
            </tr>
          </tbody>
        </Table>
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
