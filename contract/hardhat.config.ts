import type { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

require("dotenv").config()

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
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
