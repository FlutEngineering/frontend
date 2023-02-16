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
} from "@chakra-ui/react";

import { FaMediumM, FaTwitter, FaTelegram, FaHome } from "react-icons/fa";

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
              <Text textAlign="center">
                Ethereum Mainnet Contract Address&nbsp;
              </Text>
              <Text>0x4F08705FB8F33AffC231ed66e626B40E84A71870</Text>
            </Box>
          </Link>
        </Box>
        <Box width="15vw" height="1vh" />
        <Text color="grey">team@flut.cloud</Text>
        <Box width="2vw" height="1vh" />
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
          href={"https://medium.com/@team_83271"}
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
      </HStack>
    </Box>
  );
};
export default Header;
