import styles from "@/styles/Home.module.css";

import {
  Box,
  Image as ChakraImage,
  HStack,
  Link,
  Icon,
  Text,
} from "@chakra-ui/react";

import { FaMediumM, FaTwitter, FaTelegram, FaHome } from "react-icons/fa";

const Header = () => (
  <Box display="flex" flexDirection="row" width="75vw">
    <HStack>
      <Box className={styles.description}>
        <Link
          href={
            "https://etherscan.io/token/0x4F08705FB8F33AffC231ed66e626B40E84A71870"
          }
          key={"Etherscan"}
          _notFirst={{ ml: { base: 2, lg: 4 } }}
          isExternal
          _hover={{ dropShadow: "5", transition: "0.4s" }}
        >
          <p>
            Ethereum Mainnet Contract Address&nbsp;
            <code className={styles.code}>
              0x4F08705FB8F33AffC231ed66e626B40E84A71870
            </code>
          </p>
        </Link>
      </Box>
      <Text color="grey" paddingLeft="2vw" paddingRight="13vw">
        team@flut.cloud
      </Text>
    </HStack>

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
export default Header;
