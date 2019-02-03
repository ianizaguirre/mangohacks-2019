import React from 'react';
import styled from 'styled-components';
import { Card, Heading } from '@8base/boost';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';

import { PropertyDeleteDialog } from './PropertyDeleteDialog';
import { AvatarList } from './AvatarList';
import GeoLocate from './GeoLocate';
// import UserLocation from './UserLocation';
import Status from './Status';

// const Container = styled.div`
//   width: 90%;
//   margin: 0 auto;
// `;
const StatusWrapper = styled.div`
  background-color: #fff;
  padding: 24px;
`;
const GeoLocateWrapper = styled.div`
  background-color: #fff;
`;
const AvatarWrapper = styled.div`
  background-color: #fff;
`;
const Profile = () => (
  <Card.Plate padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Profile" />
    </Card.Header>

    <PropertyCreateDialog />
    <PropertyEditDialog />
    <PropertyDeleteDialog />

    <Card.Body padding="none" stretch>
      <AvatarWrapper>
        <AvatarList />
      </AvatarWrapper>
      <GeoLocateWrapper>
        <GeoLocate />
      </GeoLocateWrapper>
      <StatusWrapper>
        <Status />
      </StatusWrapper>
    </Card.Body>
  </Card.Plate>
);

export { Profile };
