import React, { PropTypes, Component } from 'react';
import { Button, Form, Table } from 'semantic-ui-react';

import TransactionItem from './tx_item.jsx';
import TxNewButton from './tx_new_button.jsx';
import OwnersList from './owners_list.jsx';
import SelfCallingTxItem from './self_calling_tx_item.jsx';

import TxItem from './tx_item.jsx';

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
            return <TxItem key={i} index={i} {...this.props} />;
          })}
        </Table.Body>
      </Table>
    );
  }
}

MultisigTxList.propTypes = {
  contract: PropTypes.object.isRequired,
};
