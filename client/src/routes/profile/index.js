import React from 'react';
import styled from 'styled-components';
import { Card, Heading } from '@8base/boost';
import bottle from '../../images/bottle-message-2.png';
import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';

import { PropertyDeleteDialog } from './PropertyDeleteDialog';
import { AvatarList } from './AvatarList';
import GeoLocate from './GeoLocate';

import Status from './Status';
import StatusMatch from './StatusMatch';

const Container = styled.div`
  width: 97%;
  margin: 0 auto;
  padding: ${props => (props.main ? '25px' : 'initial')};
`;
const StatusWrapper = styled.div`
  padding: 24px;
`;
const StatusMatchWrapper = styled.div`
  background-color: #fff;
  padding: 24px;
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const GeoLocateWrapper = styled.div`
  background-color: #fff;
`;

//TODO: Change justify content
const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottleImg = styled.img.attrs({
  src: bottle,
})`
  width: 16%;
`;

const Profile = () => (
  <Card.Plate padding="md" stretch>
    <Card.Header>
      <Container>
        <Heading type="h4" text="Profile" />
      </Container>
    </Card.Header>
    <Container main>
      <PropertyCreateDialog />
      <PropertyEditDialog />
      <PropertyDeleteDialog />

      <GridContainer>
        <AvatarContainer>
          <AvatarList />
          <GeoLocateWrapper>
            <GeoLocate />
          </GeoLocateWrapper>
        </AvatarContainer>
        <StatusWrapper>
          <Status />
        </StatusWrapper>
        <StatusMatchWrapper>
          <StatusMatch />
        </StatusMatchWrapper>
      </GridContainer>
    </Container>
    <BottleImg />
  </Card.Plate>
);

export { Profile };
