// const hre = require("hardhat");

// const main = async () => {
//   const transactionsFactory = await hre.ethers.getContractFactory(
//     "Transactions"
//   );
//   const transactionsContract = await transactionsFactory.deploy();

//   await transactionsContract.deployed();

//   console.log("Transactions address: ", transactionsContract.address);
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// runMain();



// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const votingContract = await hre.ethers.getContractFactory("Transactions");
  const deployVotingContract = await votingContract.deploy();

  console.log(`Contract address deployed: ${deployVotingContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract address deployed: 0xD0a335705701bebbd1F7813acE1288B487282467

