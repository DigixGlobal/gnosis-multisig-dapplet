import React, { PropTypes, Component } from 'react';
import { Icon, Table, List, Button, Form } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

const DefaultAddressSelector = require('@digix/spectrum/src/components/common/default_address_selector').default;
const TransactionModal = require('@digix/spectrum/src/components/transactions/transaction_modal').default;

export default class TxDetailModal extends Component {
  constructor(props) {
    super(props);
    this.renderActions = this.renderActions.bind(this);
  }
  renderButton(show, { header, trigger, handleTransaction }) {
    const { handleMined, web3, network } = this.props;
    return (
      <TransactionModal
        data={{ gas: 3000000 }}
        {...{ web3, network, trigger: show ? trigger : null, header, handleTransaction, onMined: handleMined }}
      />
    );
  }
  renderActions({ hide }) {
    const { contract, index, defaultAddress } = this.props;
    const confirmations = contract.getConfirmations(index) || [];
    const transaction = contract.transactions(index) || {};
    const address = (defaultAddress || {}).address;
    const isOwner = address && (contract.getOwners() || []).indexOf(address.toLowerCase()) > -1;
    const hasApproved = address && confirmations.indexOf(address.toLowerCase()) > -1;
    const canExecute = !transaction.executed && confirmations.length >= contract.required().toNumber();
    const canApprove = isOwner && !hasApproved;
    const canRevoke = !transaction.executed && hasApproved;
    return [
      <Button content="Done" onClick={hide} />,
      this.renderButton(canRevoke, {
        header: 'Revoke Confirmation',
        trigger: <Button content="Remove Confirmation" floated="left" color="red" icon="remove" />,
        handleTransaction: formData => contract.revokeConfirmation.sendTransaction(index, formData),
      }),
      this.renderButton(canApprove, {
        header: 'Approve Transaction',
        trigger: <Button content="Approve" color="green" icon="checkmark" />,
        handleTransaction: formData => contract.confirmTransaction.sendTransaction(index, formData),
      }),
      this.renderButton(canExecute, {
        header: 'Re-Execute',
        trigger: <Button content="Re-Execute" color="blue" icon="repeat" />,
        handleTransaction: formData => contract.executeTransaction.sendTransaction(index, formData),
      }),
    ];
  }
  render() {
    const { contract, index } = this.props;
    const confirmations = contract.getConfirmations(index) || [];
    const required = contract.required() || 0;
    const { destination, value, data, executed } = contract.transactions(index) || {};

    return (
      <EZModal
        initiallyOpen
        onClose={this.props.handleClose}
        // {...{ web3, contract, network }}
        // data={{ gas: 200000 }}
        header={`Transaction Info: ${index}`}
        content={() => (
          <Form>
            <Form.Field>
              <label>Select Account</label>
              <DefaultAddressSelector />
            </Form.Field>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Destination</Table.Cell>
                  <Table.Cell>{`${destination}`}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Value</Table.Cell>
                  <Table.Cell>{`${value}`}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell style={{ wordBreak: 'break-all' }}>
                    {`${data}`}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Executed</Table.Cell>
                  <Table.Cell><Icon name={executed ? 'checkmark' : 'remove'} color={executed ? 'green' : 'red'} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Confirmations</Table.Cell>
                  <Table.Cell>
                    <List num>{confirmations.map(c => <List.Item key={c} content={c} icon="key" />)}</List>
                    {/* {required} */}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form>
        )}
        onMined={this.handleMined}
        actions={this.renderActions}
      />
    );
  }
}

TxDetailModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  defaultAddress: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  web3: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  handleMined: PropTypes.func.isRequired,
};
