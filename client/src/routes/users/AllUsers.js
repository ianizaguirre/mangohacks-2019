/* eslint-disable */
import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import styled from 'styled-components';

const USERS_LIST_QUERY = gql`
  query UsersList {
    usersList {
      items {
        id
        createdAt
        updatedAt
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

const Container = styled.div`
  h2 {
    font-size: 36px;
    color: #222d39;
    line-height: 1.3;
    margin-bottom: 20px;
  }
`;

class AllUsers extends Component {
  render() {
    return (
      <Container>
        <Query query={USERS_LIST_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;
            console.log('TEST--------');
            console.log(data.usersList.items);
            return (
              <Fragment>
                <h2>All Users</h2>
                {data.usersList.items.map(item => (
                  <p>{item.id}</p>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}
{
  /* <Container>
  <h2>All Users</h2>
  <p>Test data</p>
  <p>Test data</p>
  <p>Test data</p>
  <p>{data.user.id}</p>
</Container>; */
}
export default AllUsers;
