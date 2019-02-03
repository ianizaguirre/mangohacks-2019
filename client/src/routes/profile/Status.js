/* eslint-disable */
import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';

import { Query, Mutation } from 'react-apollo';
//
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, CheckboxField } from '@8base/boost';
import { graphql } from 'react-apollo';

import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

import { FileInputField } from 'shared/components';
//
const STATUS_CREATE_MUTATION = gql`
  mutation StatusCreate($data: StatusCreateInput!) {
    statusCreate(data: $data) {
      id
    }
  }
`;

class Status extends Component {
  onSubmit = async data => {
    await this.props.statusCreate({ variables: { data } });
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Grid.Layout gap="sm" stretch>
        <Grid.Box>
          <Field name="mood" label="Dance" component={CheckboxField} />
        </Grid.Box>
        <Grid.Box>
          <Field name="mood" label="Drink" component={CheckboxField} />
        </Grid.Box>
      </Grid.Layout>

      <Button color="neutral" type="submit" text="Update Status" loading={submitting} />
    </form>
  );

  render() {
    return (
      <Form type="CREATE" tableSchemaName="Status" onSubmit={this.onSubmit}>
        {this.renderFormContent}
      </Form>
    );
  }
}

export default Status;
