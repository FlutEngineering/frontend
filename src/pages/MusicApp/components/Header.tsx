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

const Header: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <ConnectButton showBalance={false} />
      <Spacer />
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

      <Box width="1vw" />

      <Link
        href="https://app.uniswap.org/#/swap?use=V2&outputCurrency=0x4f08705fb8f33affc231ed66e626b40e84a71870&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
        key="Uniswap"
        isExternal
        _hover={{}}
      >
        <Button variant="outline" width="120px">
          <HStack>
            <Text textAlign="center">Buy on</Text>
            <Image src={uniswapLogoUrl} w="2rem" />
          </HStack>
        </Button>
      </Link>
    </Flex>
  );
};

export default Header;
