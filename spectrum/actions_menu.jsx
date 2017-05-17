import React, { PropTypes, Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

import TxNewButton from './tx_new_button.jsx';
import SelfCallingTxItem from './self_calling_tx_item.jsx';

const DefaultAddressSelector = require('@digix/spectrum/src/components/common/default_address_selector').default;
const FormField = require('@digix/spectrum/src/components/common/form_field').default;

export default class ActionsMenu extends Component {
  render() {
    const { contract, getInitial } = this.props;
    return (
      <div>
        <TxNewButton {...this.props} onMined={getInitial} />
        <SelfCallingTxItem
          {...this.props}
          onMined={getInitial}
          header="Create Owner"
          trigger={<Button basic content="Add Owner" icon="user" />}
          getMethodData={({ newOwner }) => contract.addOwner.getData(newOwner)}
          renderForm={({ formChange, formData }) => (
            <Form.Field>
              <Form.Field>
                <label>From</label>
                <DefaultAddressSelector />
              </Form.Field>
              <FormField placeholder="e.g. `0x123...456`" label="New Owner Address" name="newOwner" {...{ formChange, formData }} />
            </Form.Field>
          )}
        />
        <SelfCallingTxItem
          {...this.props}
          onMined={getInitial}
          header="Update Minimum Quorum Requirement"
          trigger={<Button basic content="Update Quorum" icon="users" />}
          getMethodData={({ requirement }) => contract.changeRequirement.getData(requirement)}
          renderForm={({ formChange, formData }) => (
            <Form.Field>
              <Form.Field>
                <label>From</label>
                <DefaultAddressSelector />
              </Form.Field>
              <FormField type="number" placeholder="e.g. `3`" label="How many users must approve to execute a transaction" name="requirement" {...{ formChange, formData }} />
            </Form.Field>
          )}
        />
      </div>
    );
  }
}

ActionsMenu.propTypes = {
  contract: PropTypes.object.isRequired,
  getInitial: PropTypes.func.isRequired,
};
