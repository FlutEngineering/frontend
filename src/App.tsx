import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import { authenticationAdapter } from "./services/auth";
import { INFURA_API_KEY } from "./config";

import Main from "./pages/Main";
import Layout from "./components/Layout";
import Meaning from "./pages/Meaning";
import Community from "./pages/Community";
import Engineering from "./pages/Engineering";
import MusicApp from "./pages/MusicApp";
import Browse from "./pages/Browse";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import TrackPage, { loader as trackLoader } from "./pages/TrackPage";
import { useAuthStore } from "./store";

const { chains, provider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: INFURA_API_KEY, priority: 0 }),
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Navigate to="/" />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/meaning", element: <Meaning /> },
      { path: "/community", element: <Community /> },
      { path: "/engineering", element: <Engineering /> },
    ],
  },
  {
    path: "/app",
    element: <MusicApp />,
    errorElement: <Navigate to="/app" />,
    children: [
      { path: "/app", element: <Browse /> },
      { path: "/app/search", element: <Search /> },
      { path: "/app/library", element: <Library /> },
      { path: "/app/upload", element: <Upload /> },
      {
        path: "/app/:address/:slug",
        element: <TrackPage />,
        loader: trackLoader,
      },
    ],
  },
]);

function App() {
  const { status, fetchStatus } = useAuthStore();

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={status}
      >
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}

export default App;
