import { Link as RouterLink } from "react-router-dom";
import { Box, HStack, Link, Icon, Text, Flex } from "@chakra-ui/react";
import {
  FaMediumM,
  FaTwitter,
  FaTelegram,
  FaHome,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import UniswapButton from "./UniswapButton";
import Logo from "./Logo";

const Header = () => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        {/* <Logo /> */}
        <Box
          // position="relative"
          margin="0"
          padding="1rem"
          backgroundColor="#f6f7f8"
          border="1px solid #e0e2e3"
          borderRadius="12px"
        >
          <Link
            href={
              "https://etherscan.io/token/0x4F08705FB8F33AffC231ed66e626B40E84A71870"
            }
            key="Etherscan"
            isExternal
            _hover={{ dropShadow: "5", transition: "0.4s" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="0.5rem"
          >
            <Box
              display="flex"
              justifyContent="center"
              flexDirection={{ base: "column", lg: "row" }}
              // width="100%"
            >
              <Text textAlign="center">Ethereum Mainnet Contract &nbsp;</Text>
              <Text>0x4F08705FB8F33AffC231ed66e626B40E84A71870</Text>
            </Box>
          </Link>
        </Box>

        <Box width="10vw" height="1vh" />
      </Flex>

      <HStack>
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

        <UniswapButton />
      </HStack>
    </Flex>
  );
};
export default Header;
