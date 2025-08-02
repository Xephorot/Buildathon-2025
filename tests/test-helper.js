const { ethers } = require("hardhat");

// Helper functions for testing
async function deployContract(contractName, ...args) {
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contract = await ContractFactory.deploy(...args);
  await contract.deployed();
  return contract;
}

async function getSigners() {
  return await ethers.getSigners();
}

async function increaseTime(seconds) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine");
}

module.exports = {
  deployContract,
  getSigners,
  increaseTime
};