import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
  query User {
    user {
      id
    }
  }
`;

class UserLocation extends Component {
  render() {
    return (
      <Fragment>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;

            return <div>{data.user.id}</div>;
          }}
        </Query>
      </Fragment>
    );
  }
}

export default UserLocation;
{
  /* <Fragment>
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      console.log('data = ', data, loading);
      return <div>{!loading && <div>{data.user.id}}</div>}</div>;
    }}
  </Query>
</Fragment>; */
}
