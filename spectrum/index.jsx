import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Multisig from './multisig.jsx';
import { abi } from '../build/contracts/MultiSig.json';

const Web3Connect = require('@digix/spectrum/src/helpers/web3/connect').default;
const { getNetworks, getDefaultAddress } = require('@digix/spectrum/src/selectors');

class MultiSig extends Component {
  render() {
    const loading = <p>Loading...</p>;
    const { web3Redux, networks, defaultAddress, address, networkId } = this.props;
    const { web3 } = (web3Redux.networks || {})[networkId] || {};
    if (!web3 || !web3.isConnected()) { return loading; }
    const contract = web3.eth.contract(abi).at(address);
    if (!contract) { return loading; }
    const network = networks.find(n => n.id === networkId);
    return <Multisig {...{ contract, web3, network, defaultAddress }} />;
  }
}

MultiSig.propTypes = {
  address: PropTypes.string.isRequired,
  networkId: PropTypes.string.isRequired,
  web3Redux: PropTypes.object.isRequired,
  networks: PropTypes.array.isRequired,
  defaultAddress: PropTypes.object.isRequired,
};

export default connect(state => ({
  networks: getNetworks(state),
  defaultAddress: getDefaultAddress(state),
}))(Web3Connect(MultiSig));
