import contractArtifact from "@/contracts/EthEcho.json"
import { useEthersSigner } from "@/useEthersSigner"
import { ethers } from "ethers"
const contractABI = contractArtifact.abi

export default function Home() {
  // const currentChainId = useChainId()
  // const { address: walletAddress } = useAccount()
  // const { data: balance } = useBalance({ address: walletAddress })
  const signer = useEthersSigner()

  const writeContract = async () => {
    try {
      if (!window.ethereum || !signer) throw new Error("Ethereum object doesn't exist!")

      // const signer = await new ethers.BrowserProvider(window.ethereum).getSigner()
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, contractABI, signer)
      const mahola = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL)

      // 署名したTxを取得する
      console.info("Before count:", ethers.toNumber(await contract.getTotalEchoes()))
      const tx = await contract.addEcho.populateTransaction()
      const signedTx = await signer.signTransaction(tx)
      console.info("success signer.sendTransaction")

      // 署名したTxをmaholajsonRPC経由で送信する
      await (await mahola.broadcastTransaction(signedTx)).wait()
      console.info("After count:", ethers.toNumber(await contract.getTotalEchoes()))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <w3m-button />
      <button type="button" onClick={writeContract}>
        コントラクトを実行する
      </button>
    </div>
  )
}
