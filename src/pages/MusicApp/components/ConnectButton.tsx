import { Button } from "@chakra-ui/react";
import { ConnectButton as RainbowKitButton } from "@rainbow-me/rainbowkit";
import { Address } from "wagmi";

import Identicon from "~/components/Identicon";

const ConnectButton: React.FC = () => {
  return (
    <RainbowKitButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button variant="outline" onClick={openConnectModal}>
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button variant="outline" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    variant="outline"
                    onClick={openAccountModal}
                    leftIcon={
                      <Identicon
                        address={account.address as Address}
                        size={22}
                      />
                    }
                  >
                    {account.ensName || account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowKitButton.Custom>
  );
};

export default ConnectButton;
