import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

import TxItem from './tx_item.jsx';
import ActionsMenu from './actions_menu.jsx';

const SeriesPaginator = require('@digix/spectrum/src/components/common/series_paginator').default;

const tabs = [
  { mode: [true, true], name: 'All', icon: 'globe' },
  { mode: [true, false], name: 'Pending', icon: 'clock' },
  { mode: [false, true], name: 'Executed', icon: 'checkmark' },
];

export default class MultisigTxList extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 0 };
  }
  componentDidMount() {
    const { contract } = this.props;
    contract.getTransactionCount.call(tabs[0].mode[0], tabs[0].mode[1]);
    contract.getTransactionCount.call(tabs[1].mode[0], tabs[1].mode[1]);
    contract.getTransactionCount.call(tabs[2].mode[0], tabs[2].mode[1]);
    contract.getOwners.call();
    contract.required.call();
  }
  handleChangeTab(tab, { reset }) {
    this.setState({ tab });
    reset();
  }
  render() {
    const { contract } = this.props;
    const { mode } = tabs[this.state.tab];
    return (
      <SeriesPaginator
        getLatest={(from, to) => contract.getTransactionIds.call(from, to, mode[0], mode[1])}
        getTotal={() => contract.getTransactionCount.call(mode[0], mode[1])}
        renderItem={id => <TxItem key={id} index={id} {...this.props} />}
        renderBefore={props => (
          <div>
            <ActionsMenu {...this.props} {...props} />
            <Menu secondary>
              {tabs.map(({ name, icon, mode: myMode }, i) => {
                const count = contract.getTransactionCount(myMode[0], myMode[1]);
                return (
                  <Menu.Item
                    key={i}
                    onClick={() => this.handleChangeTab(i, props)}
                    active={i === this.state.tab}
                  >
                    <Icon name={icon} />
                    {name}
                    {count && !!count.toNumber() && <Label color="teal" content={count.toNumber()} />}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        )}
        renderContainer={({ renderItems }) => (
          <Table selectable attached="bottom">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>👍</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Destination</Table.HeaderCell>
                <Table.HeaderCell>Data</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {renderItems()}
            </Table.Body>
          </Table>
        )}
      />
    );
  }
}

MultisigTxList.propTypes = {
  contract: PropTypes.object.isRequired,
};
