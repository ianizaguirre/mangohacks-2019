/* eslint-disable */
import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';

import { Query, Mutation } from 'react-apollo';
//
import { Grid } from '@8base/boost';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #f9fafb;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.14), 0 4px 6px 0 rgba(112, 157, 199, 0.08);
  border-radius: 10px;
`;

const WrapperStatusHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* a {
    padding: 1rem 3rem;

    &:hover {
      opacity: 0.7;
    } */
  /* } */
  h1 {
    font-size: 36px;
    color: #222d39;
    font-weight: 500;
    line-height: 1.3;
  }
  h2 {
    font-size: 17px;
    color: #222d39;
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    font-size: 17px;
    color: #1fb6ff;
    line-height: 1.3;
    font-size: 500;
  }
`;

const CURRENT_USER_QUERY = gql`
  query User {
    user {
      id
      mood
    }
  }
`;

const UPDATE_STATUS_MUTATION = gql`
  mutation UserUpdate($data: UserUpdateInput!) {
    userUpdate(data: $data) {
      id
      mood
    }
  }
`;

class Status extends Component {
  state = {
    mood: '',
  };

  handleUpdateItem = async (updateItemMutation, id) => {
    // call the mutation
    console.log(' ✅ Updating User Status');
    // console.log(this.state);
    const response = await updateItemMutation({
      variables: {
        data: {
          ...this.state,
          id,
        },
      },
    });
    // console.log(response);
  };

  handleOnValueChange = event => {
    this.setState({
      mood: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;

            return (
              <Mutation mutation={UPDATE_STATUS_MUTATION}>
                {(userUpdate, { loading, error }) => {
                  this.handleUpdateItem(userUpdate, data.user.id);

                  return (
                    <Container>
                      <WrapperStatusHead>
                        <h1>My Status</h1>
                        <h2>I am looking too...</h2>
                      </WrapperStatusHead>

                      <Form>
                        <Grid.Layout gap="sm">
                          <Grid.Box>
                            <label>
                              Dance:
                              <input
                                type="radio"
                                value="dance"
                                onChange={this.handleOnValueChange}
                                checked={this.state.mood === 'dance'}
                              />
                            </label>
                          </Grid.Box>
                          <Grid.Box>
                            <label>
                              Drink:
                              <input
                                type="radio"
                                value="drink"
                                onChange={this.handleOnValueChange}
                                checked={this.state.mood === 'drink'}
                              />
                            </label>
                          </Grid.Box>
                          <Grid.Box>
                            <label>
                              Talk:
                              <input
                                type="radio"
                                value="talk"
                                onChange={this.handleOnValueChange}
                                checked={this.state.mood === 'talk'}
                              />
                            </label>
                          </Grid.Box>
                          <Grid.Box>
                            <label>
                              Join a group excursion:
                              <input
                                type="radio"
                                value="excursion"
                                onChange={this.handleOnValueChange}
                                checked={this.state.mood === 'excursion'}
                              />
                            </label>
                          </Grid.Box>
                          <Grid.Box>
                            <label>
                              Not be disturbed:
                              <input
                                type="radio"
                                value="donotdisturb"
                                onChange={this.handleOnValueChange}
                                checked={this.state.mood === 'donotdisturb'}
                              />
                            </label>
                          </Grid.Box>
                        </Grid.Layout>
                      </Form>
                    </Container>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Status;
