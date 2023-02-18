import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY, priority: 0 }),
    infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority: 1 }),
    publicProvider({ priority: 2 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "FLUT",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
