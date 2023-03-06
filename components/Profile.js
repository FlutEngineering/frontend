import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Input,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  IconButton,
  BsThreeDotsVertical,
  VStack,
  useDisclosure,
  Avatar,
  HStack,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useBalance, useAccount, useEnsName } from "wagmi";

import SettingsDrawer from "components/SettingsDrawer";

import AudioUploader from "./AudioUploader";
import Search from "components/Search";
import Library from "components/Library";
import Browse from "components/Browse";
import HeaderNoEther from "./HeaderNoEther";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";

const Profile = () => {
  const [pageContent, setPageContent] = useState("browse");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();
  const { address, isConnecting, isDisconnected } = useAccount();
  // const { data: ENSdata } = useEnsName({
  //   address: address,
  // });

  // console.log("👾", ENSdata, address);
  return (
    <>
      <Center backgroundColor="gray.100">
        <Card
          width={{ base: "90vw", md: "45vw", lg: "90vw" }}
          height="90vh"
          margin="10"
        >
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            width="75vw"
            alignItems="center"
            justifyContent="flex-start"
            margin="5"
          >
            <ConnectButton showBalance={false} />
            <Box width="5vw" height="1vh" />
            <HeaderNoEther />
          </Flex>

          <CardBody flexWrap="nowrap" overflowY="auto">
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              alignItems="start"
              justifyContent="flex-start"
              padding="1rem"
            >
              <Flex direction="column" alignItems="start">
                <VStack gap="1" alignItems="flex-start">
                  <IconButton
                    icon={<AiOutlineSetting />}
                    variant="outline"
                    onClick={onOpen}
                  />
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
                      setPageContent("browse");
                    }}
                  />
                  <IconButton
                    icon={<BiLibrary />}
                    variant="outline"
                    onClick={() => {
                      setPageContent("library");
                    }}
                  />
                  <IconButton
                    icon={<AiOutlineCloudUpload />}
                    variant="outline"
                    onClick={() => {
                      setPageContent("upload");
                    }}
                  />
                </VStack>
              </Flex>
              <Box width="5vw" />
              <Box flex={1}>
                {pageContent === "browse" && <Browse />}
                {pageContent === "search" && <Search />}
                {pageContent === "library" && <Library />}
                {pageContent === "upload" && <AudioUploader />}
              </Box>
            </Flex>
          </CardBody>

          <SettingsDrawer
            finalFocusRef={btnRef}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
        </Card>
      </Center>
    </>
  );
};

export default Profile;
