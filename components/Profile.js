import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Input,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  IconButton,
  BsThreeDotsVertical,
  VStack,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Icon,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useBalance, useAccount, useEnsName } from "wagmi";

import SettingsDrawer from "components/SettingsDrawer";
import useGetAlbumImages from "hooks/useGetAlbumImages";
import AudioUploader from "./AudioUploader";
import Search from "components/Search";
import Library from "components/Library";
import HeaderNoEther from "./HeaderNoEther";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";

const ImageGallery = ({ imageURLs }) => {
  if (imageURLs) {
    return (
      // <Box maxW="70vw" mx="auto" overflowX="auto">
      <Box
        display="flex"
        flexWrap="nowrap"
        overflowX="auto"
        alignItems="center"
        justifyContent="center"
        mt={8}
        mb={8}
      >
        {imageURLs?.map((image, index) => (
          <Image
            key={index}
            src={image}
            margin="2"
            alt="SongImg"
            width={{ base: "15vw", lg: "10vw" }}
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.2s",
            }}
          />
        ))}
      </Box>
    );
  }
  return <></>;
};

const Profile = () => {
  const [pageContent, setPageContent] = useState("home");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: ENSdata } = useEnsName({
    address: address,
  });
  // const { data: imgURLs } = useGetAlbumImages();
  console.log("👾", ENSdata, address);
  return (
    <Center backgroundColor="gray.100">
      <Card
        width={{ base: "90vw", md: "45vw", lg: "90vw" }}
        height="90vh"
        margin="10"
      >
        <CardBody flexWrap="nowrap" overflowY="auto">
          <CardHeader pb={2}></CardHeader>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            alignItems="start"
            justifyContent="flex-start"
            padding="1rem"
          >
            <Flex direction="column" alignItems="start">
              <HStack gap="5" paddingY="5">
                <Avatar
                  size="md"
                  src="https://i.imgur.com/RKVTD2x.png"
                  onClick={onOpen}
                  ref={btnRef}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "transform ease 0.2s",
                  }}
                />

                <ConnectButton showBalance={false} />
              </HStack>
              <VStack gap="1" alignItems="flex-start" padding="1">
                <IconButton
                  icon={<AiOutlineSearch />}
                  variant="outline"
                  onClick={() => {
                    setPageContent("search");
                  }}
                />
                <IconButton
                  icon={<AiOutlineHome />}
                  variant="outline"
                  onClick={() => {
                    setPageContent("home");
                  }}
                />
                <IconButton
                  icon={<BiLibrary />}
                  variant="outline"
                  onClick={() => {
                    setPageContent("library");
                  }}
                />
              </VStack>
            </Flex>
            <Box width="5vw" />
            <Box paddingY="5" flex={1}>
              {pageContent === "home" && <AudioUploader />}
              {pageContent === "search" && <Search />}
              {pageContent === "library" && <Library />}
            </Box>
          </Flex>
        </CardBody>

        <CardFooter>
          <HeaderNoEther />
        </CardFooter>
        <SettingsDrawer
          finalFocusRef={btnRef}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      </Card>
    </Center>
  );
};

export default Profile;
