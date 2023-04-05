import { Link as RouterLink } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Box,
  Image,
  HStack,
  Link,
  Icon,
  Text,
  Button,
  Spacer,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaMediumM,
  FaTwitter,
  FaTelegram,
  FaHome,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import uniswapLogoUrl from "~/assets/uniswap.svg";

import { useEnsName, useAccount } from "wagmi";

const OtherAccount: React.FC = () => {
  const { address } = useAccount();
  return (
    <>
      {address && (
        <Button
          colorScheme="blue"
          width="5rem"
          variant="outline"
          onClick={async () => {}}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default OtherAccount;
