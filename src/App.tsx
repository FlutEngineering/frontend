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
import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
import { authenticationAdapter } from "./services/auth";
import { INFURA_API_KEY, ALCHEMY_API_KEY } from "./config";

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
import Profile, { loader as profileLoader } from "./pages/Profile";
import TrackPage, { loader as trackLoader } from "./pages/TrackPage";
import { useAuthStore } from "./store";
import { rainbotkitTheme } from "./theme";
import CustomAvatar from "./components/CustomAvatar";

const { chains, provider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: INFURA_API_KEY, priority: 0 }),
    alchemyProvider({ apiKey: ALCHEMY_API_KEY, priority: 1 }),
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
    path: "/",
    element: <MusicApp />,
    errorElement: <Navigate to="/search" />,
    children: [
      { path: "/browse", element: <Browse /> },
      { path: "/search", element: <Search /> },
      // { path: "/profile", element: <Profile /> },
      { path: "/upload", element: <Upload /> },
      {
        path: "/:address",
        element: <Profile />,
        loader: profileLoader,
        errorElement: <Navigate to="/" />,
      },
      {
        path: "/:address/:slug",
        element: <TrackPage />,
        loader: trackLoader,
        errorElement: <Navigate to="/" />,
      },
    ],
  },
]);

function App() {
  const { status, fetchStatus, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchStatus();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={status}
      >
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme(rainbotkitTheme)}
          avatar={CustomAvatar}
        >
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}

export default App;
