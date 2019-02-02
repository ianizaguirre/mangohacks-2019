/* eslint-disable */
import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Avatar, Table, Button, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import { DateTime } from 'luxon';
import gql from 'graphql-tag';

import { PropertyCreateDialog } from './PropertyCreateDialog';
import { PropertyEditDialog } from './PropertyEditDialog';
import { PropertyDeleteDialog } from './PropertyDeleteDialog';

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
  <Table.Plate>
    <Table.Header columns="repeat(10, 1fr) 60px">
      <Table.HeaderCell>Pictures</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body loading={avatars.loading} data={R.pathOr([], ['avatarsList', 'items'], avatars)}>
      {avatar => (
        <Table.BodyRow columns="repeat(10, 1fr) 60px" key={avatar.id}>
          {/* <Table.BodyCell> */}
          {avatar.pictures.items.length > 0 && (
            <Avatar
              src={avatar.pictures.items[0].downloadUrl}
              alt=""
              onPick={() => {
                openModal(PropertyEditDialog.id, { initialValues: avatar });
              }}
              pickLabel="Change"
            />
          )}
          {/* {avatar.pictures.items.length > 0 && (
              <img src={avatar.pictures.items[0].downloadUrl} alt="" style={{ width: '5rem', height: '5rem' }} />
            )} */}

          {/* </Table.BodyCell> */}
          <Table.BodyCell>{avatar.name}</Table.BodyCell>

          <Table.BodyCell>
            <Dropdown.Plate defaultOpen={false}>
              <Dropdown.Head>
                <Icon name="Dots" color="LIGHT_GRAY2" />
              </Dropdown.Head>
              <Dropdown.Body pin="right">
                {({ closeDropdown }) => (
                  <Menu.Plate>
                    <Menu.Item
                      onClick={() => {
                        openModal(PropertyDeleteDialog.id, { id: avatar.id });
                        closeDropdown();
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Plate>
                )}
              </Dropdown.Body>
            </Dropdown.Plate>
          </Table.BodyCell>
        </Table.BodyRow>
      )}
    </Table.Body>
    <Table.Footer justifyContent="center">
      <Button onClick={() => openModal(PropertyCreateDialog.id)}>Create Property</Button>
    </Table.Footer>
  </Table.Plate>
);

AvatarList = compose(
  withModal,
  graphql(AVATARS_LIST_QUERY, { name: 'avatars' })
)(AvatarList);

export { AvatarList };
