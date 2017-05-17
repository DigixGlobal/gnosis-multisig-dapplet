const MultiSig = artifacts.require('MultiSig');

module.exports = function (deployer, network, accounts) {
  console.log('deploying', accounts.slice(0, 4));
  deployer.deploy(MultiSig, accounts.slice(0, 4), 3);
};
