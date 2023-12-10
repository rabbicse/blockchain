require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/hlUdpo0W4OsMRBbsxFgdQKp96cG2hi6h",
      accounts: [
        "61b08386d20b9f518e37d1ff550de3aabb18cab0c51b8d2d4e010b74b7921356",
      ],
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

// https://eth-sepolia.g.alchemy.com/v2/hlUdpo0W4OsMRBbsxFgdQKp96cG2hi6h
// hlUdpo0W4OsMRBbsxFgdQKp96cG2hi6h
