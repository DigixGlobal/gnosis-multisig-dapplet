import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Segment } from 'semantic-ui-react';

import SelfCallingTxItem from './self_calling_tx_item.jsx';

const DefaultAddressSelector = require('@digix/spectrum/src/components/common/default_address_selector').default;
const AddressInput = require('@digix/spectrum/src/components/common/address_input').default;

export default class OwnersList extends Component {
  render() {
    const owners = this.props.contract.getOwners() || [];
    return (
      <Segment.Group>
        {owners.map(owner => (
          <Segment key={owner}>
            <code>{owner}</code>{' '}{' '}{' '}
            <SelfCallingTxItem
              {...this.props}
              header={`Replace Owner: ${owner}`}
              icon={{ color: 'blue', name: 'edit' }}
              getMethodData={({ newAddress }) => this.props.contract.replaceOwner.getData(owner, newAddress)}
              renderForm={({ formChange, formData }) => (
                <Form.Field>
                  <Form.Field>
                    <label>From</label>
                    <DefaultAddressSelector />
                  </Form.Field>
                  <AddressInput placeholder="e.g. `0x123...456`" label="New Address" name="newAddress" {...{ formChange, formData }} />
                </Form.Field>
              )}
            />
            <SelfCallingTxItem
              {...this.props}
              header={`Remove Owner: ${owner}`}
              icon={{ color: 'red', name: 'remove' }}
              getMethodData={() => this.props.contract.removeOwner.getData(owner)}
              renderForm={() => (
                <Form.Field>
                  <Form.Field>
                    <label>From</label>
                    <DefaultAddressSelector />
                  </Form.Field>
                </Form.Field>
              )}
            />
          </Segment>
        ))}
      </Segment.Group>
    );
  }
}

OwnersList.propTypes = {
  contract: PropTypes.object.isRequired,
};
