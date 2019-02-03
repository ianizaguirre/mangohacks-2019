/* eslint-disable */
import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import styled from 'styled-components';

// import AllUsers from './AllUsers';

const CURRENT_USER_QUERY = gql`
  query User {
    user {
      id
      lat
      long
    }
  }
`;

const USERS_LIST_QUERY = gql`
  query UsersList {
    usersList {
      items {
        id
        lat
        long
        mood
      }
    }
  }
`;

// const UPDATE_LOCATION_MUTATION = gql`
//   mutation UserUpdate($data: UserUpdateInput!) {
//     userUpdate(data: $data) {
//       id
//       lat
//       long
//     }
//   }
// `;

//----------------------

// export const UPDATE_LOCATION_MUTATION = gql`
//   mutation UserUpdate($data: UserUpdateInput!) {
//     userUpdate(data: $data) {
//       id
//       lat
//       long
//     } filter: {id: }
//   }
// `;

//
//  mutation {
//    userUpdate(data: {

//          lat: 1.322222
//        long: 23.26622

//  } filter: {id: "cjrmv3lie006901quv1cgkjt1"}) {
//    id

//    }
//  }

const Container = styled.div`
  border-left: 1px solid #d5dce3;
  padding: 0 24px 24px 24px;

  h2 {
    font-size: 36px;
    color: #222d39;
    line-height: 1.3;
    margin-bottom: 20px;
  }
`;
// -------------
const FeetText = styled.span`
  color: #0f9f4f;
  font-weight: 500;
`;
const IdText = styled.span`
  color: #ff7849;
  font-weight: 500;
`;
const MiniContainer = styled.div`
  p {
    font-size: 17px;
    color: #222d39;
    line-height: 1.3;
  }
`;

class StatusMatch extends Component {
  handleDistance = item => {
    console.log('TESSSSSSSSSSSSSSS');
    console.log('item Length ===>', item.length);
    console.log(item);

    if (item.length > 0) {
      console.log('🔥🔥🔥🔥🔥🔥🔥');
      item = item[0];
      //
      //
      let lat2 = item.lat;
      let lon2 = item.long;
      let id = item.id;
      let mood = item.mood;
      //
      let lat1 = JSON.parse(localStorage.getItem('Current-User-Lat'));
      let lon1 = JSON.parse(localStorage.getItem('Current-User-Long'));
      // mood1 is already stored as a string so no need to parse it
      let mood1 = localStorage.getItem('Current-Mood-Set');
      //
      console.log(`LAT1--CurrentUser------>`, lat1);
      console.log(`LON1--CurrentUser------>`, lon1);
      console.log(`Mood1---CurrentUser----->`, mood1);
      //
      console.log(`LAT2--OtherUser------>`, lat2);
      console.log(`LON2--OtherUser------>`, lon2);
      console.log(`Mood2----OTHER-User---->`, mood);

      // -------Round to at max 2 decimal places -------
      lat1 = Math.round(lat1 * 100) / 100;
      lon1 = Math.round(lon1 * 100) / 100;
      lat2 = Math.round(lat2 * 100) / 100;
      lon2 = Math.round(lon2 * 100) / 100;
      // -----------------------------------------------

      console.log(`LAT1--CurrentUser------>`, lat1);
      console.log(`LON1--CurrentUser------>`, lon1);
      console.log(`Mood1---CurrentUser----->`, mood1);
      //
      console.log(`LAT2--OtherUser------>`, lat2);
      console.log(`LON2--OtherUser------>`, lon2);
      console.log(`Mood2----OTHER-User---->`, mood);
      //

      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var radlon1 = (Math.PI * lon1) / 180;
      var radlon2 = (Math.PI * lon2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      console.log(`dist ========>`, dist);
      let feet = dist * 5280;
      // return dist // miles
      console.log(`FEET========>`, feet);

      // Round Feet to 2 decimal places
      // feet = Math.floor(feet * 100) / 100;
      feet = Math.round(feet * 100) / 100;
      console.log('FEET ROUNDED------>', feet);

      console.log('mood1 == mood ', mood1 == mood);
      console.log('feet < 30 ', feet < 30);

      // TODO : fix feet check issue -- (mood1 == mood && feet < 30)
      //
      if (mood1 == mood && feet < 30) {
        return (
          <MiniContainer>
            <p>
              One user is <FeetText>{feet}</FeetText> feet away
            </p>
            <br />
            <p>
              Their id is <IdText>{id}</IdText>
            </p>
            <br />
          </MiniContainer>
        );
      } // END IF
    } // END IF
  };

  handleFilter = item => {
    // we need to filter out the current logged in users object from showing up
    console.log(`THIS IS THE WHOLE ITEM------->`, item);
    let currentUserID = localStorage.getItem('Logged-In-As');
    console.log(`THIS SHOULD BE YOUR ID`, currentUserID);

    let otherArray = [item].filter(function(obj) {
      return obj.id !== currentUserID;
    });

    console.log('Final Array======');
    console.log(otherArray);

    // return otherArray;

    return this.handleDistance(otherArray);
  };

  render() {
    return (
      <Container>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;
            return (
              <Query query={USERS_LIST_QUERY}>
                {({ data, loading }) => {
                  if (loading) return <p>Loading...</p>;
                  {
                    /* console.log('TEST--------'); */
                  }

                  console.log(data.usersList.items);

                  return (
                    <Fragment>
                      <h2>Matches</h2>
                      {data.usersList.items.map(item => (
                        <div key={item.id}>
                          {/* {this.handleFilter(item)}
                          {this.handleDistance(item.lat, item.long, item.id, item.mood)} */}

                          {this.handleFilter(item)}
                        </div>
                      ))}
                    </Fragment>
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default StatusMatch;
