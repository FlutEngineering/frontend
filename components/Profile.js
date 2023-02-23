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
  AvatarBadge,
  AvatarGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "components/Layout";
import { useBalance, useAccount } from "wagmi";
import axios from "axios";
import AudioUploader from "./AudioUploader";

const IMAGES = [
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
  "/cowboyFlute.jpeg",
];
const ImageGallery = ({ imageURLs }) => {
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
      {/* <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} minW="800px"> */}
      {imageURLs?.map((image, index) => (
        <Image
          key={index}
          src={image}
          margin="2"
          width={{ base: "15vw", lg: "10vw" }}
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.2s",
          }}
        />
      ))}
      {/* </SimpleGrid> */}
    </Box>
  );
};

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: "0x4f08705fb8f33affc231ed66e626b40e84a71870",
  });
  const [imgURLs, setImgURLs] = useState([""]);

  useEffect(() => {
    console.log("request images");
    axios
      .get("https://midjourney.com/showcase/recent/")
      .then(function (response) {
        const paragraph = response.data;
        const regex = `https:\/\/cdn\.midjourney\.com\/[a-z0-9-/_]*\.png`;
        const allImgUrls = [...paragraph.matchAll(regex)];
        const oddImgUrls = allImgUrls.map((element, index) => {
          if (index % 2 === 0) {
            return element;
          }
        });

        setImgURLs(oddImgUrls);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <Layout>
      <VStack marginBottom={2}>
        <Card width={{ base: "90vw", md: "42vw", lg: "30vw" }} height="40vh">
          <CardBody>
            <Flex direction="row" justifyContent="space-evenly">
              <Tooltip label="click me">
                <Avatar
                  size="xl"
                  src="https://i.imgur.com/RKVTD2x.png"
                  onClick={onOpen}
                  ref={btnRef}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  }}
                />
              </Tooltip>
              <ConnectButton showBalance={false} />
            </Flex>
            <Text
              fontSize="3xl"
              paddingY="5"
              fontWeight="bold"
              color="gray.700"
            >
              ${Math.trunc(data?.formatted)} FLUT
            </Text>

            <HStack>
              <Text fontWeight="bold" color="gray.700">
                Followers
              </Text>
              <Text fontWeight="bold" color="gray.700">
                99
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="gray.700">
                Following
              </Text>
              <Text fontWeight="bold" color="gray.700">
                22
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="gray.700">
                Total Plays
              </Text>
              <Text fontWeight="bold" color="gray.700">
                1,257
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold" color="gray.700">
                Revenue
              </Text>
              <Text fontWeight="bold" color="gray.700">
                $ 9,020,220 FLUT
              </Text>
            </HStack>
          </CardBody>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          ></CardFooter>
        </Card>

        <Card width={{ base: "90vw", md: "42vw", lg: "30vw" }} minHeight="40vh">
          <CardHeader pb={2}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              AUDIO UPLOAD
            </Text>
          </CardHeader>
          <CardBody pt={0}>
            <AudioUploader />
          </CardBody>
        </Card>
      </VStack>
      <Tooltip label="Display Purposes Only">
        <Card
          width={{ base: "90vw", md: "45vw", lg: "60vw" }}
          height="80vh"
          margin={5}
          marginTop={0}
        >
          <CardBody flexWrap="nowrap" overflowY="auto">
            <Flex direction="column" alignItems="center">
              <Text fontSize="3xl" fontWeight="bold" color="gray.600">
                Jazz{" "}
              </Text>

              <ImageGallery imageURLs={imgURLs} />
            </Flex>
            <Flex direction="column" alignItems="center">
              <Text fontSize="3xl" fontWeight="bold" color="gray.600">
                Not Jazz{" "}
              </Text>

              <ImageGallery imageURLs={imgURLs} />
            </Flex>
            <Flex direction="column" alignItems="center">
              <Text fontSize="3xl" fontWeight="bold" color="gray.600">
                Post Country Vapor Wave{" "}
              </Text>

              <ImageGallery imageURLs={imgURLs} />
            </Flex>

            <Flex direction="column" alignItems="center">
              <Text fontSize="3xl" fontWeight="bold" color="gray.600">
                Subliminal Messaging{" "}
              </Text>

              <ImageGallery imageURLs={imgURLs} />
            </Flex>
          </CardBody>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          ></CardFooter>
        </Card>
      </Tooltip>
      <>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Account</DrawerHeader>

            <DrawerBody>
              <>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Some Settings
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      FLUT, the magic flute that calls, To all the creators, the
                      music makers, Come, build a world where talent thrives,
                      Where music and art are free to rise. A world where fears
                      of copyright, Are but a thing of the past, A place where
                      creators can create, And be rewarded for their craft. A
                      decentralized community, Of artists, musicians, and
                      listeners too, A place where talent can shine, And
                      listeners can bask in its divine. Oh, imagine the
                      possibilities, Of a world where the barriers are gone,
                      Where the magic of music can unite, The hearts and souls
                      of everyone. FLUT is the way, the future, Where creativity
                      knows no bounds, Join us, let’s create a world, Where
                      music and art resound.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          More Settings
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      3 billion FLUT (1.27 million $) are locked in a vesting
                      contract on Llamapay & ownership of the contract has been
                      renounced. This is a 3 month lock. These funds are
                      intended to pay our team over time as we PUT IN HARD WORK.
                      🦄
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </Layout>
  );
};

export default Profile;
