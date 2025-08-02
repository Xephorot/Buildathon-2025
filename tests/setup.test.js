const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Development Environment Setup", function () {
  it("Should have access to ethers", function () {
    expect(ethers).to.not.be.undefined;
  });

  it("Should be able to get signers", async function () {
    const signers = await ethers.getSigners();
    expect(signers.length).to.be.greaterThan(0);
  });

  it("Should have correct network configuration", function () {
    const network = hre.network.name;
    expect(network).to.be.a('string');
  });
});