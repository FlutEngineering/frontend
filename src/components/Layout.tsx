import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "~/components/Header";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="6rem"
      paddingY="6rem"
      minHeight="100vh"
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
