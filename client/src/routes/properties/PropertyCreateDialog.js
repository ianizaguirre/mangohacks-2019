import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, CheckboxField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

import { FileInputField } from 'shared/components';

const PROPERTY_CREATE_MUTATION = gql`
  mutation PropertyCreate($data: PropertyCreateInput!) {
    propertyCreate(data: $data) {
      id
    }
  }
`;

const PROPERTY_CREATE_DIALOG_ID = 'PROPERTY_CREATE_DIALOG_ID';

class PropertyCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    await this.props.propertyCreate({ variables: { data } });

    this.context.closeModal(PROPERTY_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(PROPERTY_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Property" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="pictures" label="Pictures" component={FileInputField} maxFiles={20} public={true} />
          </Grid.Box>
          <Grid.Box>
            <Field name="title" label="Title" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="description" label="Description" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="bedrooms" label="Bedrooms" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="sqFootage" label="Sq Footage" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="bathrooms" label="Bathrooms" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="garage" label="Garage" component={CheckboxField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="pool" label="Pool" component={CheckboxField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="red" type="submit" text="Create Property" loading={submitting} />
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog.Plate id={PROPERTY_CREATE_DIALOG_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Properties" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog.Plate>
    );
  }
}

PropertyCreateDialog = graphql(PROPERTY_CREATE_MUTATION, {
  name: 'propertyCreate',
  options: {
    refetchQueries: ['PropertiesList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Property successfuly created',
    },
  },
})(PropertyCreateDialog);

PropertyCreateDialog.id = PROPERTY_CREATE_DIALOG_ID;

export { PropertyCreateDialog };
