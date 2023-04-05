import { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Stack,
  Grid,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  StackDivider,
} from "@chakra-ui/react";
import { useTagStore, useTrackStore, useArtistStore } from "~/store";
// import { ASSETS_URL } from "~/config";
import AudioItem from "~/components/AudioItem";
import { useParams } from "react-router-dom";
import { useEnsName, useAccount } from "wagmi";
import YourAccount from "./components/YourAccount";
import OtherAccount from "./components/OtherAccount";
import { BACKEND_API_URL } from "~/config";

function Profile(): JSX.Element {
  const { tracks, fetchTracksByAddress } = useTrackStore();
  const { address: toFollow } = useParams();
  const { data: ensName } = useEnsName({ address: toFollow as `0x${string}` });
  const { address: followedBy } = useAccount();
  const { artist, fetchArtist } = useArtistStore();

  useEffect(() => {
    if (toFollow) {
      fetchTracksByAddress(toFollow);
      fetchArtist(toFollow);
    }
  }, [toFollow, fetchTracksByAddress, fetchArtist]);

  return (
    <Flex direction="column" width="100%">
      <Text
        gridArea="header"
        marginY="1rem"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bold"
        color="gray.600"
      >
        {ensName && <Text>{ensName}</Text>}
      </Text>
      <Stack spacing="4">
        <Heading size="md">Profile Address</Heading>
        <Text>{toFollow}</Text>
        {toFollow !== followedBy && (
          <Button
            colorScheme="blue"
            width="5rem"
            variant="outline"
            onClick={async () => {
              await fetch(
                `${BACKEND_API_URL}/v1/artist/${toFollow}/${followedBy}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({ message: "sos" }),
                }
              ).then((response) => {
                console.log("🐞", response.json());
              });
            }}
          >
            Follow
          </Button>
        )}
        {toFollow === followedBy && <YourAccount />}

        <Box>
          <Heading size="xs" textTransform="uppercase">
            Uploads
          </Heading>
          <Box
            gridArea="track-list"
            alignSelf="stretch"
            overflowY="auto"
            marginTop="6"
          >
            <Stack spacing={2}>
              {tracks.map((track) => (
                <AudioItem track={track} key={track.title} />
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Profile;
