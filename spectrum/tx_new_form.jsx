import React, { PropTypes, Component } from 'react';
import { Form } from 'semantic-ui-react';

const DefaultAddressSelector = require('@digix/spectrum/src/components/common/default_address_selector').default;
const AddressInput = require('@digix/spectrum/src/components/common/address_input').default;
const FormField = require('@digix/spectrum/src/components/common/form_field').default;
const ValueInput = require('@digix/spectrum/src/components/common/value_input').default;

export default class TxNewForm extends Component {
  render() {
    const { formChange, formData } = this.props;
    return (
      <Form.Field>
        <Form.Field>
          <label>From</label>
          <DefaultAddressSelector />
        </Form.Field>
        <Form.Field>
          <AddressInput
            showQrScanner
            placeholder="e.g. `0x123...456`"
            label="Destination Address"
            name="destination"
            {...{ formChange, formData }}
          />
        </Form.Field>
        <ValueInput placeholder="e.g. `300`" label="Ether Value" symbol="ETH" name="ethValue" {...{ formChange, formData }} />
        <FormField placeholder="e.g. `0x1123123...`" label="Optional Data" name="data" {...{ formChange, formData }} />
      </Form.Field>
    );
  }
}

TxNewForm.propTypes = {
  formChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};
