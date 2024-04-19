import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import type { ReactNode } from "react"
import { type State, WagmiProvider, cookieStorage, createStorage } from "wagmi"
import { polygon, polygonAmoy } from "wagmi/chains"

// Get projectId at https://cloud.walletconnect.com
const projectId = "ddd705791e735d28580d1bc518dd0d39"

const queryClient = new QueryClient()

const wagmiConfig = defaultWagmiConfig({
  chains: [polygon, polygonAmoy],
  projectId,
  metadata: {
    name: "sample",
    description: "sample wallet.",
    url: "https://sample.com",
    icons: ["https://sample.com/favicons/favicon.ico"],
  },
  ssr: true, // for hydration error
  storage: createStorage({ storage: cookieStorage }),
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  enableOnramp: false, // buy crypto
  themeMode: "dark",
})

interface Props {
  children: ReactNode
  initialState?: State
}

export function WalletProvider({ children, initialState }: Props) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
