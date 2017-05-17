const MultiSig = artifacts.require('MultiSig');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(MultiSig, accounts.slice(0, 4), 3);
};
