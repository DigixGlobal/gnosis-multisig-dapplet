import React, { PropTypes, Component } from 'react';

import OwnersList from './owners_list.jsx';
import TxList from './tx_list.jsx';

export default class Multisig extends Component {
  componentDidMount() {
    const { contract } = this.props;
    contract.getTransactionCount.call(true, true);
    contract.getOwners.call();
    contract.required.call();
  }
  render() {
    return (
      <div>
        <p>TODO: Stats ( required, total counts )</p>
        <OwnersList {...this.props} />
        <TxList {...this.props} />
      </div>
    );
  }
}

Multisig.propTypes = {
  contract: PropTypes.object.isRequired,
};
