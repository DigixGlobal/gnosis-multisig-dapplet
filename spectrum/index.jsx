import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ContractInterface from './tx_list.jsx';
import { networks as contractNetworks, abi } from '../build/contracts/MultiSig.json';

const Web3Connect = require('@digix/spectrum/src/helpers/web3/connect').default;
const { getNetworks, getDefaultAddress } = require('@digix/spectrum/src/selectors');

// get the last key (testnet)
const contractNetworkKeys = Object.keys(contractNetworks);
const networkKey = contractNetworkKeys[contractNetworkKeys.length - 1];

class MultiSig extends Component {
  render() {
    const loading = <p>Loading...</p>;
    const { web3Redux, networks, defaultAddress } = this.props;
    const { address: contractAddress } = (contractNetworks || {})[networkKey];
    if (!contractAddress) { return loading; }
    const { web3 } = (web3Redux.networks || {})['eth-testrpc'] || {};
    if (!web3 || !web3.isConnected()) { return loading; }
    const contract = web3.eth.contract(abi).at(contractAddress);
    if (!contract) { return loading; }
    const network = networks.find(n => n.id === 'eth-testrpc');
    return <ContractInterface {...{ contract, web3, network, defaultAddress }} />;
  }
}

MultiSig.propTypes = {
  web3Redux: PropTypes.object.isRequired,
  networks: PropTypes.array.isRequired,
  defaultAddress: PropTypes.object.isRequired,
};

export default connect(state => ({
  networks: getNetworks(state),
  defaultAddress: getDefaultAddress(state),
}))(Web3Connect(MultiSig));
