var Car = artifacts.require("Car");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
    let ownerAddress = web3.eth.accounts[0];
    deployer.deploy(Car, ownerAddress);
};