import { useEffect } from "react";
import { Text, Box, Stack, Flex, Heading, useToast } from "@chakra-ui/react";
import { useTrackStore, useArtistStore } from "~/store";

import AudioItem from "~/components/AudioItem";
import { useParams } from "react-router-dom";
import { useEnsName, useAccount } from "wagmi";

import ProfileLinkButton from "~/components/ProfileLinkButton";
import FollowButton from "./components/FollowButton";

function Profile(): JSX.Element {
  const { tracks, fetchTracksByAddress } = useTrackStore();
  const { address: toFollow } = useParams();
  const { data: ensName } = useEnsName({ address: toFollow as `0x${string}` });
  const { address: followedBy } = useAccount();
  const { artist, fetchArtist } = useArtistStore();
  const toast = useToast();

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
      <Text gridArea="header" textAlign="center" fontSize="sm" color="gray.600">
        {toFollow}
      </Text>

      <Stack spacing="4">
        {toFollow && followedBy && (
          <FollowButton
            toFollow={toFollow}
            followedBy={followedBy}
            artist={artist}
          />
        )}

        <Heading size="md">Followed By</Heading>
        {artist?.followedBy?.map((follow) => (
          <ProfileLinkButton address={follow?.followerId} />
        ))}
        <Heading size="md">Following</Heading>
        {artist?.following?.map((follow) => (
          <ProfileLinkButton address={follow?.followingId} />
        ))}
        <Box>
          <Heading size="md">Uploads</Heading>
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
