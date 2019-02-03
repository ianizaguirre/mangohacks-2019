import React from 'react';
import { Card, Heading } from '@8base/boost';
import styled from 'styled-components';
import AllUsers from './AllUsers';

const Container = styled.div`
  width: 97%;
  margin: 0 auto;
  padding: ${props => (props.main ? '25px' : 'initial')};
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AllUsersWrapper = styled.div`
  background-color: #fff;
`;

const Users = () => (
  <Card.Plate padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="All Users" />
    </Card.Header>
    <Container main>
      <GridContainer>
        <Card.Body padding="none" stretch>
          <AllUsersWrapper>
            <AllUsers />
          </AllUsersWrapper>
        </Card.Body>
      </GridContainer>
    </Container>
  </Card.Plate>
);

export { Users };
