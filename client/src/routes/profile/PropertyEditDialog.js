import React from 'react';
import * as R from 'ramda';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import { FileInputField } from 'shared/components';
import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const PROPERTY_EDIT_DIALOG_ID = 'PROPERTY_EDIT_DIALOG_ID';

class PropertyEditDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = R.memoize(id => async data => {
    await this.props.avatarUpdate({ variables: { data: { ...data, id } } });

    this.context.closeModal(PROPERTY_EDIT_DIALOG_ID);
  });

  onClose = () => {
    this.context.closeModal(PROPERTY_EDIT_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Edit Property" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="pictures" label="Pictures" component={FileInputField} maxFiles={20} />
          </Grid.Box>

          <Grid.Box>
            <Field name="name" label="Name" type="text" component={InputField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="red" type="submit" text="Update Property" disabled={pristine || invalid} loading={submitting} />
      </Dialog.Footer>
    </form>
  );

  renderForm = ({ args }) => {
    return (
      <Form
        type="UPDATE"
        tableSchemaName="Avatar"
        onSubmit={this.createOnSubmit(args.initialValues.id)}
        initialValues={args.initialValues}
      >
        {this.renderFormContent}
      </Form>
    );
  };

  render() {
    return (
      <Dialog.Plate id={PROPERTY_EDIT_DIALOG_ID} size="sm">
        {this.renderForm}
      </Dialog.Plate>
    );
  }
}

PropertyEditDialog = graphql(sharedGraphQL.AVATAR_UPDATE_MUTATION, {
  name: 'avatarUpdate',
  options: {
    refetchQueries: ['AvatarList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Property successfuly updated',
    },
  },
})(PropertyEditDialog);

PropertyEditDialog.id = PROPERTY_EDIT_DIALOG_ID;

export { PropertyEditDialog };
