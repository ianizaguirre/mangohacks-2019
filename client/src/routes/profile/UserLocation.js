/* eslint-disable */
import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';

import { Query, Mutation } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
  query User {
    user {
      id
      lat
      long
    }
  }
`;

export const UPDATE_LOCATION_MUTATION = gql`
  mutation UserUpdate($data: UserUpdateInput!) {
    userUpdate(data: $data) {
      id
      lat
      long
    }
  }
`;

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

class UserLocation extends Component {
  state = {
    lat: 0,
    long: 0,
  };

  userReceived = user => {
    console.log('userId = ', user.id);
    localStorage.setItem('Logged-In-As', user.id);
    console.log(user);
  };

  componentDidUpdate() {
    if (this.props.lat > 0) {
      setTimeout(
        () =>
          this.setState({
            lat: this.props.lat,
            long: this.props.long,
          }),
        3000
      );
    }
  }
  // await this.props.propertyUpdate({ variables: { data: { ...data, id } }});
  handleUpdateItem = async (updateItemMutation, id) => {
    // call the mutation
    console.log(' ✅ Updating UserLocation - lat & long');
    // console.log(this.state);
    const response = await updateItemMutation({
      variables: {
        data: {
          ...this.state,
          id,
        },
      },
    });
    // console.log('Updated!!!!!!!!!!!!');
    // console.log(response);
  };

  render() {
    return (
      <Fragment>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;

            return (
              <Mutation mutation={UPDATE_LOCATION_MUTATION}>
                {(userUpdate, { loading, error }) => {
                  this.userReceived(data.user);

                  this.handleUpdateItem(userUpdate, data.user.id);

                  return (
                    <div>
                      <div>{data.user.id}</div>
                      <p>...............</p>
                      <p>{this.props.lat}</p>
                      <p>{this.props.long}</p>
                    </div>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default UserLocation;
