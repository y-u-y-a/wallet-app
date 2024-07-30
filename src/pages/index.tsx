import contractArtifact from "@/contracts/EthEcho.json"
import { type TypedDataDomain, type TypedDataField, ethers } from "ethers"
import { useChainId } from "wagmi"
const contractABI = contractArtifact.abi

export default function Home() {
  const chainId = useChainId()
  // const { address: signerAddress } = useAccount()
  // const { data: balance } = useBalance({ address: walletAddress })
  // const signer = useEthersSigner()

  const writeContract = async () => {
    try {
      if (!window.ethereum) throw new Error("Ethereum object doesn't exist!")

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      const mahola = new ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/3wTx5ulLjQHl_eq-Lsaenu5XZ_48ax7I")
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      const signerAddress = await signer.getAddress()

      console.log({ signerAddress })

      const unsignedTx = {
        chainId,
        to: contractAddress,
        data: new ethers.Interface(["function addEcho()"]).encodeFunctionData("addEcho"),
        nonce: await provider.getTransactionCount(signerAddress, "pending"), // 一意
        gasLimit: ethers.toNumber(22000),
        gasPrice: ethers.parseUnits("10", "gwei"),
        value: 0, // 送金するMATICの値
      }
      // const gasLimit = await provider.estimateGas(baseTx)

      const domain: TypedDataDomain = {
        name: "EthEcho",
        version: "1",
        chainId,
        verifyingContract: contractAddress,
      }
      const types: Record<string, TypedDataField[]> = {
        // キーはprimaryTypeに合わせる
        AddEcho: [
          { name: "from", type: "address" },
          { name: "functionSignature", type: "string" },
        ],
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const message: Record<string, any> = {
        from: signerAddress,
        functionSignature: "addEcho()",
      }

      // 署名済Txを作成
      // const unsignedTx = { ...baseTx, gasLimit }
      const signature = ethers.Signature.from(await signer.signTypedData(domain, types, message))
      console.log({ signature })
      const signedTx = ethers.Transaction.from({ ...unsignedTx, signature, from: signerAddress })
      console.log({ signedTx })
      // 署名済Txを送信
      console.info("Before count:", ethers.toNumber(await contract.getTotalEchoes()))
      const txResponse = await mahola.broadcastTransaction(signedTx.serialized)
      console.info({ txResponse })
      await txResponse.wait()
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
