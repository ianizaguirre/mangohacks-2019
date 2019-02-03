/* eslint-disable */
import React, { Fragment } from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Avatar, Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
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
    border: 0;
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
  padding-top: 10px;
  font-size: 19px;
  line-height: 1.3;
  color: #222d39;
  font-weight: 500;
`;

const Button = styled.button`
  outline: none;
  text-align: center;

  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
  transition: all 0.15s ease-in-out;
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;
  border-color: #4da1ff;
  background-color: #4da1ff;
  color: rgba(255, 255, 255, 1);
  height: 4rem;
  padding: 0 4rem;

  &:hover {
    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.14), 0 4px 6px 0 rgba(112, 157, 199, 0.08);
  }
`;

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

let AvatarList = ({ avatars, openModal, closeModal }) => {
  // console.log('TESSSSSSSSST');

  const localStorageRef = localStorage.getItem('Set-Profile');
  // console.log(typeof JSON.parse(localStorageRef));
  if (JSON.parse(localStorageRef) === true) {
    return (
      <Container>
        <Table.Body loading={avatars.loading} data={R.pathOr([], ['avatarsList', 'items'], avatars)}>
          {avatar => (
            <Fragment>
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
            </Fragment>
          )}
        </Table.Body>
      </Container>
    );
  } else {
    return <Button onClick={() => openModal(PropertyCreateDialog.id)}>Create Avatar</Button>;
  }
};

AvatarList = compose(
  withModal,
  graphql(AVATARS_LIST_QUERY, { name: 'avatars' })
)(AvatarList);

export { AvatarList };
