import { useAccount, useBalance, useChainId } from "wagmi"

export default function Home() {
  const currentChainId = useChainId()
  const { address: walletAddress } = useAccount()
  const { data: balance } = useBalance({ address: walletAddress })

  console.log({ currentChainId, balance })
  return (
    <div>
      {walletAddress && <p children={`walletAddress: ${walletAddress}`} />}
      {balance && <p children={`balance: ${balance.value} ${balance.symbol}`} />}
      <w3m-button />
    </div>
  )
}
