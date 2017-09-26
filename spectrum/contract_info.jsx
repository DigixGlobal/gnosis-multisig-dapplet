import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Table } from 'semantic-ui-react';

export default class ContractInfo extends Component {
  render() {
    const { contract: { address, required, getTransactionCount } } = this.props;
    return (
      <Segment>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Address</Table.Cell>
              <Table.Cell>{address}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Required Quorum</Table.Cell>
              <Table.Cell>{`${required() || 0}`}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Transactions Executed</Table.Cell>
              <Table.Cell>{`${getTransactionCount(false, true) || 0}`}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

ContractInfo.propTypes = {
  contract: PropTypes.object.isRequired,
};
