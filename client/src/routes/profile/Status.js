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
  border-radius: 10px;

  &:hover {
    box-shadow: 0 2px 50px 0 rgba(12, 16, 20, 0.1);
  }
`;

const StatusContainer = styled.div`
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
    padding: 24px;
  }
`;
const StatusBanner = styled.div`
  background-color: #f9fafb;

  h2 {
    font-size: 17px;
    color: #8492a6;
    line-height: 1.6;
    /* margin-bottom: 20px; */
    padding: 15px 24px 13px 24px;
    /* background: #f1f3f5; */
  }
  h3 {
    line-height: 1.3;
    padding: 13px 24px 15px 24px;
    text-transform: capitalize;
    /* background: #e5e7e8; */
    background: #e6f5ff;
    font-weight: 600;
    color: #3c4858;
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;

  label {
    font-size: 17px;
    color: #222d39;

    line-height: 1.3;
    font-size: 500;

    display: flex;
    justify-content: space-between;
  }

  input {
    margin-left: 21px;
  }

  span {
    background: repeating-linear-gradient(135deg, #212529, #212529 5px, rgba(0, 0, 0, 0) 5px, rgba(0, 0, 0, 0) 10px);
    opacity: 0.0125;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
                      <StatusContainer>
                        <h1>Status</h1>
                        <StatusBanner>
                          <h2>I am looking too...</h2>
                          <h3>{data.user.mood}</h3>
                        </StatusBanner>
                      </StatusContainer>

                      <Form>
                        <span />
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
                              Join an excursion:
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
