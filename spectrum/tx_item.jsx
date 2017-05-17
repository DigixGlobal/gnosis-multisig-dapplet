import React, { PropTypes, Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';

import TxDetailModal from './tx_detail_modal.jsx';

export default class TransactionItem extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleMined = this.handleMined.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const { contract: { transactions, getConfirmations }, index } = this.props;
    transactions.call(index);
    getConfirmations.call(index);
  }
  handleClose() {
    this.setState({ active: false });
  }
  handleMined() {
    this.getData();
  }
  render() {
    const { index, contract } = this.props;
    const confirmations = contract.getConfirmations(index) || [];
    const { destination, value, data, executed } = contract.transactions(index) || {};
    return (
      <Table.Row style={{ cursor: 'pointer' }} onClick={() => this.setState({ active: true })}>
        <Table.Cell>{index}</Table.Cell>
        <Table.Cell>{destination}</Table.Cell>
        <Table.Cell>{value && value.toNumber()}</Table.Cell>
        <Table.Cell>{(data || '').substring(0, 10)}...</Table.Cell>
        <Table.Cell>{`${(confirmations).length}`} / {`${contract.required()}`}</Table.Cell>
        <Table.Cell><Icon name={executed ? 'checkmark' : 'remove'} /></Table.Cell>
        {this.state.active &&
          <TxDetailModal
            {...this.props}
            {...{
              destination,
              value,
              data,
              executed,
              confirmations,
              handleMined: this.handleMined,
              handleClose: this.handleClose,
            }}
          />
        }
      </Table.Row>
    );
  }
}

TransactionItem.propTypes = {
  index: PropTypes.number,
  contract: PropTypes.object.isRequired,
  defaultAddress: PropTypes.object.isRequired,
  web3: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
};
