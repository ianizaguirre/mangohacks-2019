import React from 'react';
import { Card, Heading } from '@8base/boost';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';

import { PropertyDeleteDialog } from './PropertyDeleteDialog';
import { AvatarList } from './AvatarList';
import GeoLocate from './GeoLocate';
// import UserLocation from './UserLocation';
import Status from './Status';

const Profile = () => (
  <Card.Plate padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Profile" />
    </Card.Header>

    <PropertyCreateDialog />
    <PropertyEditDialog />
    <PropertyDeleteDialog />

    <Card.Body padding="none" stretch>
      <AvatarList />
      <GeoLocate />
      <Status />
    </Card.Body>
  </Card.Plate>
);

export { Profile };
