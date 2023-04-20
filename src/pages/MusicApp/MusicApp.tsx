import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Center,
  CardFooter,
  Stack,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { useAccount } from "wagmi";

import SettingsDrawer from "./components/SettingsDrawer";
import Header from "./components/Header";
import AudioPlayer from "~/components/AudioPlayer";

function MusicApp(): JSX.Element {
  const {
    isOpen: isSettingsOpen,
    onOpen: openSettings,
    onClose: closeSettings,
  } = useDisclosure();
  const { address, isConnected } = useAccount();

  return (
    <Center
      alignItems="stretch"
      justifyContent="center"
      height="100vh"
      overflow="hidden"
      backgroundColor="gray.100"
    >
      <Card maxWidth="80rem" flexGrow="1" margin={{ base: 0, md: 10 }}>
        <CardHeader>
          <Header />
        </CardHeader>
        <CardBody
          as={Grid}
          padding="5"
          columnGap={{ base: 0, lg: 10 }}
          gridTemplateRows={{ base: "auto minmax(0, 1fr)", lg: "1fr" }}
          gridTemplateColumns={{ base: "1fr", lg: "auto minmax(0, 1fr)" }}
          gridTemplateAreas={{
            base: `"navbar" "page-content"`,
            lg: `"navbar page-content"`,
          }}
          overflow="hidden"
        >
          <Stack
            gridArea="navbar"
            gap="1"
            alignItems="flex-start"
            direction={{ base: "row", lg: "column" }}
            justifyContent={{ base: "center", lg: "flex-start" }}
          >
            <IconButton
              icon={<AiOutlineSetting />}
              variant="outline"
              onClick={openSettings}
              aria-label="settings"
            />
            <IconButton
              as={RouterLink}
              to="/search"
              icon={<AiOutlineSearch />}
              variant="outline"
              aria-label="search"
            />
            <IconButton
              as={RouterLink}
              to="/browse"
              icon={<BiLibrary />}
              variant="outline"
              aria-label="browse"
            />
            {isConnected && (
              <>
                <IconButton
                  as={RouterLink}
                  to={`/${address}`}
                  icon={<AiOutlineHome />}
                  variant="outline"
                  aria-label="profile"
                />
                <IconButton
                  as={RouterLink}
                  to="/upload"
                  icon={<AiOutlineCloudUpload />}
                  variant="outline"
                  aria-label="upload"
                />
              </>
            )}
          </Stack>
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
        </CardBody>

        <CardFooter>
          <Flex grow="1" paddingX={{ sm: 0, lg: 20 }} paddingRight={{ lg: 4 }}>
            <AudioPlayer />
          </Flex>
        </CardFooter>
        <SettingsDrawer isOpen={isSettingsOpen} onClose={closeSettings} />
      </Card>
    </Center>
  );
}

export default MusicApp;
