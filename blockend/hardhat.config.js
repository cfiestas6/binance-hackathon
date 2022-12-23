/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");

const { QUICKNODE_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  networks: {
    testnet: {
      url: QUICKNODE_RPC_URL,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY 
  }
};
