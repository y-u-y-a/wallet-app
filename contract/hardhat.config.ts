import "@nomicfoundation/hardhat-toolbox"
import type { HardhatUserConfig } from "hardhat/config"

require("dotenv").config()

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "amoy",
  networks: {
    amoy: {
      url: process.env.AMOY_ALCHEMY_URL || "",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
    sepolia: {
      url: process.env.SEPOLIA_ALCHEMY_URL || "",
      accounts: [process.env.WALLET_PRIVATE_KEY || ""],
    },
  },
  // paths: {
  //   sources: './contracts',
  //   tests: './test',
  //   cache: './cache',
  //   artifacts: './artifacts',
  // },
}

export default config
