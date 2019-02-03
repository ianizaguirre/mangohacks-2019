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

  background-color: #fff;
  border: 1px solid #e6e9ef;
  padding: 24px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 2px 50px 0 rgba(12, 16, 20, 0.1);
  }
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

  componentDidMount() {
    // reinstate our localStorage
    let localStorageRef = localStorage.getItem('Current-Mood-Set');
    if (localStorageRef) {
      this.setState({
        mood: localStorageRef,
      });
    }
  }

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
    let userMood = event.target.value;
    localStorage.setItem('Current-Mood-Set', userMood);
    this.setState({
      mood: userMood,
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
                        <h1>Status</h1>
                        <h2>I am looking too...</h2>
                        {data.user.mood}
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
