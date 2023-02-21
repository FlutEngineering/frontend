import { Box, Image, Text, Link } from "@chakra-ui/react";
import Header from "components/Header";
import HeaderNoEther from "./HeaderNoEther";

const Layout = ({ children }) => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        padding="6rem"
        minHeight="100vh"
      >
        <HeaderNoEther />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
