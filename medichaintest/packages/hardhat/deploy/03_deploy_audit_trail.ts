import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "AuditTrail" using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAuditTrail: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
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

  await deploy("AuditTrail", {
    from: deployer,
    // Contract constructor arguments (AuditTrail doesn't need any arguments)
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const auditTrail = await hre.ethers.getContract<Contract>("AuditTrail", deployer);
  console.log("📋 AuditTrail deployed successfully!");
  
  // Initialize with some example audit entries to demonstrate functionality
  console.log("🔍 Adding initial audit entries for demonstration...");
  
  // Log an example access
  const tx1 = await auditTrail.logAccess(
    deployer,
    "Initial system setup - Admin access",
    hre.ethers.keccak256(hre.ethers.toUtf8Bytes("setup_data"))
  );
  await tx1.wait();
  
  // Log an example permission change
  const tx2 = await auditTrail.logPermissionChange(
    deployer,
    "GRANT_ADMIN",
    "Deployer granted admin permissions during setup"
  );
  await tx2.wait();
  
  // Check the audit log
  const auditLogLength = await auditTrail.getAuditLogLength();
  console.log("📊 Initial audit log entries:", auditLogLength.toString());
  
  // Get the first entry to verify it works
  if (auditLogLength > 0) {
    const firstEntry = await auditTrail.getAuditEntry(0);
    console.log("✅ First audit entry created successfully");
    console.log("   Actor:", firstEntry[0]);
    console.log("   Action:", firstEntry[2]);
  }
};

export default deployAuditTrail;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags AuditTrail
deployAuditTrail.tags = ["AuditTrail"];
