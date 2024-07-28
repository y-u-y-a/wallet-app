import abi from "@/contracts/EthEcho.json"
import { ethers } from "ethers"
const contractABI = abi.abi

export default function Home() {
  // const currentChainId = useChainId()
  // const { address: walletAddress } = useAccount()
  // const { data: balance } = useBalance({ address: walletAddress })
  // const signer = useEthersSigner()

  const handleWriteContract = async () => {
    try {
      if (!window.ethereum) throw new Error("Ethereum object doesn't exist!")

      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL)
      const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY, provider)
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, contractABI, wallet)

      /* 署名を取得 */
      // const signer = await new ethers.BrowserProvider(window.ethereum).getSigner()
      // const signer = await provider.getSigner(walletAddress)
      // console.log("Signer:", { signer })

      /** コントラクト実行 */
      // const contractWithSigner = contract.connect(signer)
      console.log("Before count:", ethers.toNumber(await contract.getTotalEchoes()))
      const tx = await contract.addEcho()
      await tx.wait()
      console.log("After count:", ethers.toNumber(await contract.getTotalEchoes()))
      console.log("tx.hash: ", tx.hash)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {/* {walletAddress && <p children={`walletAddress: ${walletAddress}`} />}
      {balance && <p children={`balance: ${balance.value} ${balance.symbol}`} />} */}
      <w3m-button />
      <button type="button" onClick={handleWriteContract}>
        コントラクトを実行する
      </button>
    </div>
  )
}
