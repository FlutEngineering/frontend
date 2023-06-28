import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Header from "~/components/Header";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingX={{ base: 3, lg: "3rem" }}
      paddingY={{ base: 3, lg: "1rem" }}
      minHeight="100vh"
      height="100vh"
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
