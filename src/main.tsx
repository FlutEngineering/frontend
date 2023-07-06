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
import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
import { authenticationAdapter } from "./services/auth";
import { INFURA_API_KEY, ALCHEMY_API_KEY } from "./config";

import App from "./App";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

const queryClient = new QueryClient();

// const { chains, provider } = configureChains(
//   [mainnet],
//   [
//     infuraProvider({ apiKey: INFURA_API_KEY, priority: 0 }),
//     alchemyProvider({ apiKey: ALCHEMY_API_KEY, priority: 1 }),
//     // publicProvider({ priority: 2 }),
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: "FLUT",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: false,
//   connectors,
//   provider,
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
    {/* <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={status}
      >
        <RainbowKitProvider chains={chains} theme={darkTheme()}> */}
      {/* <QueryClientProvider client={queryClient}> */}
        <App />
      {/* </QueryClientProvider> */}
      {/* </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig> */}
    </ChakraProvider>
  </React.StrictMode>
);
