import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  VStack,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";

import SettingsDrawer from "./components/SettingsDrawer";
import Header from "./components/Header";
import { useAccount } from "wagmi";

function MusicApp(): JSX.Element {
  const {
    isOpen: isSettingsOpen,
    onOpen: openSettings,
    onClose: closeSettings,
  } = useDisclosure();
  const { isConnected } = useAccount();

  return (
    <Center backgroundColor="gray.100">
      <Card
        width={{ base: "90vw", md: "45vw", lg: "90vw" }}
        height="90vh"
        margin="10"
      >
        <CardBody flexWrap="nowrap" overflowY="auto">
          <CardHeader pb={2}>
            <Header />
          </CardHeader>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            alignItems="start"
            justifyContent="flex-start"
            padding="1rem"
          >
            <Flex direction="column" alignItems="start">
              <VStack gap="1" alignItems="flex-start" paddingRight="36px">
                <IconButton
                  icon={<AiOutlineSetting />}
                  variant="outline"
                  onClick={openSettings}
                  aria-label="settings"
                />
                <IconButton
                  as={RouterLink}
                  to="/app/search"
                  icon={<AiOutlineSearch />}
                  variant="outline"
                  aria-label="search"
                />
                <IconButton
                  as={RouterLink}
                  to="/app"
                  icon={<AiOutlineHome />}
                  variant="outline"
                  aria-label="browse"
                />
                <IconButton
                  as={RouterLink}
                  to="/app/library"
                  icon={<BiLibrary />}
                  variant="outline"
                  aria-label="library"
                />
                {isConnected && (
                  <IconButton
                    as={RouterLink}
                    to="/app/upload"
                    icon={<AiOutlineCloudUpload />}
                    variant="outline"
                    aria-label="upload"
                  />
                )}
              </VStack>
            </Flex>
            <Flex direction="row" grow="1">
              <Outlet />
              {/* <Flex alignItems="center" justifyContent="center" width="100%"> */}
              {/*   <VStack padding="10"> */}
              {/*     <Text fontSize="xx-large"> */}
              {/*       We're currently updating the upload service */}
              {/*     </Text> */}
              {/*     <Icon as={HiOutlineWrenchScrewdriver} w="10vw" h="10vh" /> */}
              {/*   </VStack> */}
              {/* </Flex> */}
            </Flex>
          </Flex>
        </CardBody>

        <SettingsDrawer isOpen={isSettingsOpen} onClose={closeSettings} />
      </Card>
    </Center>
  );
}

export default MusicApp;
