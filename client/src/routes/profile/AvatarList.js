/* eslint-disable */
import React, { Fragment } from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Avatar, Table, Button, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import { DateTime } from 'luxon';
import gql from 'graphql-tag';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';

import styled from 'styled-components';

const Container = styled.div`
  /* display: flex; */
  div:first-child {
    overflow-y: hidden;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div:first-child {
    width: 14rem;
    height: 14rem;
  }
`;
const ContainAvatar = styled.div`
  /* div svg {
    width: 1.8rem;
    height: 1.8rem;
  } */
  /* background: green; */
`;
const Title = styled.h3`
  font-size: 19px;
  line-height: 1.3;
  color: #222d39;
  font-weight: 500;
`;
// const Wrap= styled.div`

// `;

const AVATARS_LIST_QUERY = gql`
  query AvatarList {
    avatarsList {
      items {
        id
        createdAt
        updatedAt
        pictures {
          items {
            id
            downloadUrl
            shareUrl
          }
        }
        name
      }
    }
  }
`;

let AvatarList = ({ avatars, openModal, closeModal }) => (
  <Container>
    <Table.Body loading={avatars.loading} data={R.pathOr([], ['avatarsList', 'items'], avatars)}>
      {avatar => (
        <ContainAvatar key={avatar.id}>
          <Wrap>
            {avatar.pictures.items.length > 0 && (
              <Avatar
                src={avatar.pictures.items[0].downloadUrl}
                alt=""
                onPick={() => {
                  openModal(PropertyEditDialog.id, { initialValues: avatar });
                }}
                pickLabel="Change"
                size="xl"
              />
            )}

            <Title>{avatar.name}</Title>
          </Wrap>
        </ContainAvatar>
      )}
    </Table.Body>
    <div>
      <Button onClick={() => openModal(PropertyCreateDialog.id)}>Create Property</Button>
    </div>
  </Container>
);

AvatarList = compose(
  withModal,
  graphql(AVATARS_LIST_QUERY, { name: 'avatars' })
)(AvatarList);

export { AvatarList };
