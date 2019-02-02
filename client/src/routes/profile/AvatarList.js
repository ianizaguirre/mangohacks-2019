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
import { PropertyDeleteDialog } from './PropertyDeleteDialog';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
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
  <Fragment>
    <Table.Body loading={avatars.loading} data={R.pathOr([], ['avatarsList', 'items'], avatars)}>
      {avatar => (
        <div key={avatar.id}>
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

          <div>{avatar.name}</div>

          <div>
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
          </div>
        </div>
      )}
    </Table.Body>
    <div>
      <Button onClick={() => openModal(PropertyCreateDialog.id)}>Create Property</Button>
    </div>
  </Fragment>
);

AvatarList = compose(
  withModal,
  graphql(AVATARS_LIST_QUERY, { name: 'avatars' })
)(AvatarList);

export { AvatarList };
