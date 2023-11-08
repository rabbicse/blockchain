require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],

    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};

// Contract address deployed: 0xfB8632cD517600aaE9B63D7c7Ee5285dFD213E73
