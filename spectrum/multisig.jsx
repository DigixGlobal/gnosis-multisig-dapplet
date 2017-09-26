import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Header } from 'semantic-ui-react';

import OwnersList from './owners_list.jsx';
import TxList from './tx_list.jsx';
import ContractInfo from './contract_info.jsx';

export default class Multisig extends Component {
  componentDidMount() {
    const { contract } = this.props;
    contract.getTransactionCount.call(true, true);
    contract.getOwners.call();
    contract.required.call();
  }
  render() {
    return (
      <Grid>
        <Grid.Column computer={8} tablet={16}>
          <Header content="MultiSig Wallet" subheader="Transactions require approvals from multiple different accounts" />
          <ContractInfo {...this.props} />
        </Grid.Column>
        <Grid.Column computer={8} tablet={16}>
          <Header content="Owners" subheader="Users in control of Wallet" />
          <OwnersList {...this.props} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Header content="Transactions" subheader="Actions executed by Multisig owners" />
          <TxList {...this.props} />
        </Grid.Column>
      </Grid>
    );
  }
}

Multisig.propTypes = {
  contract: PropTypes.object.isRequired,
};
