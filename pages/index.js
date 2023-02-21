import { Inter } from "@next/font/google";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

import Profile from "components/Profile";
import HomePage from "components/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, connector, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  if (isConnected) {
    return (
      <>
        <Profile />
      </>
    );
  } else {
    return <HomePage />;
  }
}
