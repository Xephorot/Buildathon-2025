const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment to Avalanche network...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy contracts (will be implemented in later tasks)
  console.log("Deployment script ready - contracts will be deployed in later tasks");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });