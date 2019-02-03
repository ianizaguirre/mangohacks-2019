/* eslint-disable */
import React, { Component, Fragment } from 'react';

// import gql from 'graphql-tag';

// import { Query, Mutation } from 'react-apollo';

import styled from 'styled-components';

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

class StatusMatch extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <h2>Status Matches</h2>
          <p>Test data</p>
          <p>Test data</p>
          <p>Test data</p>
        </Container>
      </Fragment>
    );
  }
}

export default StatusMatch;
