import styles from "@/styles/Home.module.css";

import {
  Box,
  Image,
  Flex,
  VStack,
  HStack,
  Link,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";

import {
  FaMediumM,
  FaTwitter,
  FaTelegram,
  FaHome,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";

const Header = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      width="75vw"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        gap="1rem"
      >
        <Box
          // position="relative"
          margin="0"
          padding="1rem"
          backgroundColor="rgba(var(--callout-rgb), 0.5)"
          border="1px solid rgba(var(--callout-border-rgb), 0.3)"
          borderRadius="var(--border-radius)"
        >
          <Link
            href={
              "https://etherscan.io/token/0x4F08705FB8F33AffC231ed66e626B40E84A71870"
            }
            key={"Etherscan"}
            _notFirst={{ ml: { base: 2, lg: 4 } }}
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
              flexDirection={{ base: "column", md: "row" }}
              // width="100%"
            >
              <Text textAlign="center">Ethereum Mainnet Contract &nbsp;</Text>
              <Text>0x4F08705FB8F33AffC231ed66e626B40E84A71870</Text>
            </Box>
          </Link>
        </Box>

        <Box width="10vw" height="1vh" />
      </Box>

      <HStack>
        <Link href={"/"} key={"Home"} _notFirst={{ ml: { base: 2, lg: 4 } }}>
          <Icon
            as={FaHome}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href={"https://t.me/+BhXkKrFweoAzODcx"}
          key={"Telegram"}
          _notFirst={{ ml: { base: 2, lg: 4 } }}
          isExternal
        >
          <Icon
            as={FaTelegram}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href={"https://medium.com/@TheMagicFlut"}
          key={"Medium"}
          _notFirst={{ ml: { base: 2, lg: 4 } }}
          isExternal
        >
          <Icon
            as={FaMediumM}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href={"https://twitter.com/TheMagicFlut"}
          key={"Twitter"}
          _notFirst={{ ml: { base: 2, lg: 4 } }}
          isExternal
        >
          <Icon
            as={FaTwitter}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href={"https://discord.gg/NXjGj9kHus"}
          key={"Discord"}
          _notFirst={{ ml: { base: 2, lg: 4 } }}
          isExternal
        >
          <Icon
            as={FaDiscord}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>
        <Link
          href={"https://github.com/FlutEngineering"}
          key={"Github"}
          _notFirst={{ ml: { base: 2, lg: 4 } }}
          isExternal
        >
          <Icon
            as={FaGithub}
            color="grey"
            _hover={{ color: "black", transition: "0.4s" }}
          />
        </Link>

        <Box width="1vw" />

        <Link
          href={
            "https://app.uniswap.org/#/swap?use=V2&outputCurrency=0x4f08705fb8f33affc231ed66e626b40e84a71870&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
          }
          key={"Uniswap"}
          isExternal
          _hover={{}}
        >
          <Button variant="outline">
            <HStack>
              <Text textAlign="center">Buy on</Text>
              <Image src="uniswaplogo.png" w="1.5rem" />
            </HStack>
          </Button>
        </Link>
      </HStack>
    </Box>
  );
};
export default Header;
