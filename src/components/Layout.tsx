import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "~/components/Header";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingX="6rem"
      paddingY="3rem"
      minHeight="100vh"
      height="100vh"
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
