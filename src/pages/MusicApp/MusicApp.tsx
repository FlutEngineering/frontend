import { Outlet } from "react-router-dom";
import { Flex, Grid, useDisclosure } from "@chakra-ui/react";

import SettingsDrawer from "./components/SettingsDrawer";
import Header from "./components/Header";
import AudioPlayer from "~/components/AudioPlayer";
import Sidebar from "./components/Sidebar";

const Body: React.FC = () => (
  <Grid
    width="100%"
    maxWidth="var(--chakra-breakpoints-lg)"
    flexGrow="1"
    columnGap={{ base: 0, lg: 5 }}
    gridTemplateColumns={{ base: "1fr", lg: "160px minmax(0, 1fr)" }}
    gridTemplateRows="auto minmax(0, 1fr)"
    gridTemplateAreas={{
      base: `"navbar"
             "page-content"
             "player"`,
      lg: `"navbar page-content"
           "navbar page-content"
           "navbar player"`,
    }}
    overflow="hidden"
  >
    <Sidebar gridArea="navbar" />
    <Flex
      direction="row"
      gridArea="page-content"
      alignSelf="stretch"
      alignItems="stretch"
      width="100%"
      overflow="hidden"
    >
      <Outlet />
    </Flex>
    <AudioPlayer gridArea="player" />
  </Grid>
);

function MusicApp(): JSX.Element {
  // const {
  //   isOpen: isSettingsOpen,
  //   onOpen: openSettings,
  //   onClose: closeSettings,
  // } = useDisclosure();

  return (
    <Flex
      direction="column"
      alignItems="center"
      paddingX={{ base: 3, lg: "3rem" }}
      paddingY={{ base: 3, lg: "1rem" }}
      minHeight="100vh"
      height="100vh"
    >
      <Header />
      <Body />
    </Flex>
  );
}

export default MusicApp;
