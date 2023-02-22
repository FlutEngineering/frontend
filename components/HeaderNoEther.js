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

const HeaderNoEther = () => {
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
        marginX="5"
      >
        <Text color="grey">team@flut.cloud</Text>
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
export default HeaderNoEther;
