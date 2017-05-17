import React, { PropTypes, Component } from 'react';
import { Icon } from 'semantic-ui-react';

const TransactionModal = require('@digix/spectrum/src/components/transactions/transaction_modal').default;

export default class OwnersEdit extends Component {
  constructor(props) {
    super(props);
    this.handleTransaction = this.handleTransaction.bind(this);
    this.onMined = this.onMined.bind(this);
  }
  onMined() {
    const { onMined, contract } = this.props;
    return onMined ? onMined() : contract.getTransactionCount.call(true, true);
  }
  handleTransaction(formData) {
    const { contract, getMethodData } = this.props;
    const { gas, gasPrice } = formData;
    const data = getMethodData(formData);
    return contract.submitTransaction.sendTransaction(contract.address, 0, data, { gas, gasPrice });
  }
  render() {
    const { web3, trigger, network, renderForm, header, icon } = this.props;
    const { onMined } = this;
    return (
      <TransactionModal
        {...{ web3, network, renderForm, header, onMined }}
        data={{ gas: 200000 }}
        trigger={trigger || <Icon link {...icon} style={{ display: 'inline-block' }} />}
        handleTransaction={this.handleTransaction}
      />
    );
  }
}

OwnersEdit.propTypes = {
  contract: PropTypes.object.isRequired,
  web3: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  onMined: PropTypes.func,
  icon: PropTypes.object,
  trigger: PropTypes.func,
  getMethodData: PropTypes.func.isRequired,
  renderForm: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};
