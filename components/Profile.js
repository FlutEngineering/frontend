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
} from "@chakra-ui/react";
import React from "react";
import Layout from "components/Layout";
import AudioUploader from "components/AudioUploader";
const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Layout>
      <VStack>
        <Card width={{ base: "90vw", md: "42vw", lg: "30vw" }} height="50vh">
          <CardHeader>
            <Flex direction="row" justifyContent="space-evenly">
              <Tooltip label="click me">
                {/* <Button  colorScheme="teal"> */}
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
                {/* </Button> */}
              </Tooltip>
              <ConnectButton showBalance={false} />
            </Flex>
          </CardHeader>
          <CardBody>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
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
          </CardBody>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            Stuff
          </CardFooter>
        </Card>

        <Card width={{ base: "90vw", md: "42vw", lg: "30vw" }} height="50vh">
          <CardHeader>
            <Flex direction="column"></Flex>
          </CardHeader>
          <CardBody>Body</CardBody>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            Stuff
          </CardFooter>
        </Card>
      </VStack>

      <Card
        width={{ base: "90vw", md: "45vw", lg: "60vw" }}
        height="100vh"
        margin="5"
      >
        <CardHeader>
          <Flex direction="column">
            <Tooltip label="Display Purposes Only">
              <Text fontSize="3xl">Discover </Text>
            </Tooltip>
          </Flex>
        </CardHeader>
        <CardBody></CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          Stuff
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default Profile;
