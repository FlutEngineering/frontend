import { Box, Image, Text, Link, Flex } from "@chakra-ui/react";
import Header from "components/Header";
import HeaderNoEther from "./HeaderNoEther";

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="5vh"
    >
      <HeaderNoEther />

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        padding="6rem"
        minHeight="100vh"
        // marginTop="-5vh"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
