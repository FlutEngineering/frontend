import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  RainbowKitProvider,
  darkTheme,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { authenticationAdapter } from "./services/auth";
import { useAuthStore } from "./store";
import type { RainbowKitChain } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";

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

interface AppProps {
  chains: RainbowKitChain[];
}

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

function App({ chains }: AppProps) {
  const { address } = useAccount();
  const { status, fetchStatus, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchStatus();
  }, [address]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={status}
    >
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
}

export default App;
