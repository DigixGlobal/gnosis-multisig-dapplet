import React, { PropTypes, Component } from 'react';
import { Button, Form, Table } from 'semantic-ui-react';

import TxItem from './tx_item.jsx';
import ActionsMenu from './actions_menu.jsx';

const SeriesPaginator = require('@digix/spectrum/src/components/common/series_paginator').default;

export default class MultisigTxList extends Component {
  componentDidMount() {
    const { contract } = this.props;
    contract.getTransactionCount.call(true, true);
    contract.getOwners.call();
    contract.required.call();
  }
  render() {
    const { contract } = this.props;
    // const txCount = contract.getTransactionCount(true, true);
    return (
      <SeriesPaginator
        getLatest={(from, to) => contract.getTransactionIds.call(from, to, true, true)}
        getTotal={() => contract.getTransactionCount.call(true, true)}
        renderItem={id => <TxItem key={id} index={id} {...this.props} />}
        renderBefore={props => <ActionsMenu {...this.props} {...props} />}
        renderContainer={({ renderItems }) => (
          <div>
            <Table selectable attached="bottom">
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
                {renderItems()}
              </Table.Body>
            </Table>
          </div>
        )}
      />
    )
  }
}

MultisigTxList.propTypes = {
  contract: PropTypes.object.isRequired,
};
