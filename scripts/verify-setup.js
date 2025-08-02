const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function verifySetup() {
  console.log("🔍 Verifying development environment setup...\n");

  // Check if all required directories exist
  const requiredDirs = [
    "contracts",
    "frontend/src/components",
    "frontend/src/pages", 
    "frontend/src/utils",
    "frontend/src/hooks",
    "frontend/public",
    "tests",
    "scripts"
  ];

  console.log("📁 Checking directory structure:");
  for (const dir of requiredDirs) {
    if (fs.existsSync(dir)) {
      console.log(`  ✅ ${dir}`);
    } else {
      console.log(`  ❌ ${dir} - MISSING`);
    }
  }

  // Check if package.json files exist
  console.log("\n📦 Checking package.json files:");
  const packageFiles = ["package.json", "frontend/package.json"];
  for (const file of packageFiles) {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - MISSING`);
    }
  }

  // Check if node_modules exist
  console.log("\n📚 Checking dependencies:");
  if (fs.existsSync("node_modules")) {
    console.log("  ✅ Root dependencies installed");
  } else {
    console.log("  ❌ Root dependencies not installed");
  }

  if (fs.existsSync("frontend/node_modules")) {
    console.log("  ✅ Frontend dependencies installed");
  } else {
    console.log("  ❌ Frontend dependencies not installed");
  }

  // Check Hardhat configuration
  console.log("\n⚙️  Checking Hardhat configuration:");
  try {
    const signers = await ethers.getSigners();
    console.log(`  ✅ Hardhat configured - ${signers.length} signers available`);
    console.log(`  ✅ Network: ${process.env.HARDHAT_NETWORK || 'hardhat'}`);
  } catch (error) {
    console.log(`  ❌ Hardhat configuration error: ${error.message}`);
  }

  // Check configuration files
  console.log("\n📋 Checking configuration files:");
  const configFiles = [
    "hardhat.config.js",
    ".env.example",
    "frontend/src/setupTests.js"
  ];

  for (const file of configFiles) {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - MISSING`);
    }
  }

  console.log("\n🎉 Development environment verification complete!");
  console.log("\nNext steps:");
  console.log("1. Copy .env.example to .env and configure your environment variables");
  console.log("2. Start implementing smart contracts in the contracts/ directory");
  console.log("3. Run 'npm run dev' to start the frontend development server");
  console.log("4. Run 'npm test' to execute smart contract tests");
}

verifySetup()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  });