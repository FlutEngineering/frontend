import { Link as RouterLink } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, HStack, Link, Icon, Spacer, Flex } from "@chakra-ui/react";
import {
  FaMediumM,
  FaTwitter,
  FaTelegram,
  FaHome,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import UniswapButton from "~/components/UniswapButton";

const Header: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <ConnectButton showBalance={false} />
      <Spacer />
      <HStack marginY="1rem">
        <Link
          as={RouterLink}
          to="/"
          key="Home"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          padding="5px"
        >
          <Icon
            as={FaHome}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href="https://t.me/+BhXkKrFweoAzODcx"
          key="Telegram"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          isExternal
          padding="5px"
        >
          <Icon
            as={FaTelegram}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href="https://medium.com/@TheMagicFlut"
          key="Medium"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          isExternal
          padding="5px"
        >
          <Icon
            as={FaMediumM}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href="https://twitter.com/TheMagicFlut"
          key="Twitter"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          isExternal
          padding="5px"
        >
          <Icon
            as={FaTwitter}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href="https://discord.gg/NXjGj9kHus"
          key="Discord"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          isExternal
          padding="5px"
        >
          <Icon
            as={FaDiscord}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href="https://github.com/FlutEngineering"
          key="Github"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          isExternal
          padding="5px"
        >
          <Icon
            as={FaGithub}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>

        <Link
          href="https://opensea.io/TheMagicFlut"
          key="Opensea"
          _notFirst={{ ml: { base: 0, lg: 1 } }}
          isExternal
          padding="5px"
        >
          <Icon
            as={GiSailboat}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
      </HStack>

      <Box width="1vw" />

      <UniswapButton />
    </Flex>
  );
};

export default Header;
