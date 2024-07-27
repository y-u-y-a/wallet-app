import { ethers } from "hardhat"

const deploy = async () => {
  const [deployer] = await ethers.getSigners()
  const accountBalance = await deployer.provider.getBalance(deployer.address)
  const echoContractFactory = await ethers.getContractFactory("EthEcho")
  const echoContract = await echoContractFactory.deploy()
  const ethEcho = await echoContract.waitForDeployment()
  await echoContract.getTotalEchoes()

  console.log("Deploying contracts with account: ", deployer.address)
  console.log("Account balance: ", accountBalance.toString())
  console.log("Contract deployed to:", await ethEcho.getAddress())
  console.log("Contract deployed by:", deployer.address)

  // let tx = await echoContract.addEcho()
  // await tx.wait()
  // await echoContract.getTotalEchoes()
  // // ほかのユーザーがあなたに「Echo」を送った状態をシミュレーション
  // tx = await echoContract.connect(randomPerson).addEcho()
  // // ユーザーの承認を待機
  // await tx.wait()
  // // 「Echo」の総数を更新
  // await echoContract.getTotalEchoes()
}

const main = async () => {
  try {
    await deploy()
    process.exit(0)
  } catch (error) {
    console.log({ error })
    process.exit(1)
  }
}

main()
