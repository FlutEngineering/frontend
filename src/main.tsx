import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

import App from "./App";
import "./index.css";
import { authenticationAdapter } from "./services/auth";

const AUTHENTICATION_STATUS = "unauthenticated";
const queryClient = new QueryClient();

const { chains, provider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: import.meta.env.INFURA_API_KEY, priority: 0 }),
    // alchemyProvider({ apiKey: import.meta.env.ALCHEMY_API_KEY, priority: 1 }),
    // publicProvider({ priority: 2 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "FLUT",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={AUTHENTICATION_STATUS}
          >
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <App />
            </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
