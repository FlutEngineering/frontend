import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Avatar,
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
} from "@chakra-ui/react";
import Layout from "components/Layout";
import AudioUploader from "components/AudioUploader";
const Profile = () => {
  return (
    <Layout>
      <Card maxW="md">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <ConnectButton />
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>
        <AudioUploader />

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
    </Layout>
  );
};

export default Profile;
