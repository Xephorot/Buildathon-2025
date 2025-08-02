import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "MedicalRecords" using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployMedicalRecords: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MedicalRecords", {
    from: deployer,
    // Contract constructor arguments (MedicalRecords doesn't need any arguments)
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const medicalRecords = await hre.ethers.getContract<Contract>("MedicalRecords", deployer);
  console.log("🏥 MedicalRecords deployed successfully!");
  
  // You can add some initial interaction here if needed
  // For example, checking if the contract works properly
  const documentCount = await medicalRecords.getDocumentCount(deployer);
  console.log("📄 Initial document count for deployer:", documentCount.toString());
};

export default deployMedicalRecords;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags MedicalRecords
deployMedicalRecords.tags = ["MedicalRecords"];
