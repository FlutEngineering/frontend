import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";
import { useAuthStore } from "~/store";

const { getNonce, verify, signOut } = useAuthStore.getState();

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce,
  verify,
  signOut,
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
  },
  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },
});
