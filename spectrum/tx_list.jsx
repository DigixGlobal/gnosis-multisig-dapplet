import React, { PropTypes, Component } from 'react';
import { Table } from 'semantic-ui-react';

import TransactionItem from './tx_item.jsx';
import TxNewButton from './tx_new_button.jsx';
import OwnersList from './owners_list.jsx';

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
