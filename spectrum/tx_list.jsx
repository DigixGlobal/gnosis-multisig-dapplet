import React, { PropTypes, Component } from 'react';
import { Button, Form, Table } from 'semantic-ui-react';

import TransactionItem from './tx_item.jsx';
import TxNewButton from './tx_new_button.jsx';
import OwnersList from './owners_list.jsx';
import OwnersActionIcon from './owners_action_icon.jsx';

const DefaultAddressSelector = require('@digix/spectrum/src/components/common/default_address_selector').default;
const AddressInput = require('@digix/spectrum/src/components/common/address_input').default;

export default class MultisigTxList extends Component {
  componentDidMount() {
    const { contract } = this.props;
    contract.getTransactionCount.call(true, true);
    contract.getOwners.call();
    contract.required.call();
  }
  render() {
    const { contract } = this.props;
    const txCount = contract.getTransactionCount(true, true);
    return (
      <div>
        <TxNewButton {...this.props} />
        <OwnersActionIcon
          {...this.props}
          header="Create Owner"
          trigger={<Button basic content="Add Owner" icon="user" />}
          getMethodData={({ newOwner }) => this.props.contract.addOwner.getData(newOwner)}
          renderForm={({ formChange, formData }) => (
            <Form.Field>
              <Form.Field>
                <label>From</label>
                <DefaultAddressSelector />
              </Form.Field>
              <AddressInput placeholder="e.g. `0x123...456`" label="New Owner Address" name="newOwner" {...{ formChange, formData }} />
            </Form.Field>
          )}
        />
        <OwnersList {...this.props} />
        <pre>
          <code>
            {`
// confirm transaction
${JSON.stringify({
  txCount,
  required: contract.required(),
  address: contract.address,
  owners: contract.getOwners(),
}, null, 2)}
            `}
          </code>
        </pre>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Value (wei)</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Confirmations</Table.HeaderCell>
              <Table.HeaderCell>Executed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {txCount && new Array(txCount.toNumber()).fill().map((n, i) => {
              return <TransactionItem key={i} index={i} {...this.props} />;
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

MultisigTxList.propTypes = {
  contract: PropTypes.object.isRequired,
};
