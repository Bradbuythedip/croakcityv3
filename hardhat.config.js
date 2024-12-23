require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

// Convert private key to proper format
const PRIVATE_KEY = process.env.PRIVATE_KEY ? `0x${process.env.PRIVATE_KEY.replace("0x", "")}` : "";

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    cyprus1: {
      url: "https://rpc.cyprus1.colosseum.quaiscan.io",
      chainId: 9000,
      accounts: [PRIVATE_KEY],
      timeout: 60000,
      gas: "auto",
      gasPrice: "auto"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
