import { useEffect } from "react";
import { Text, Box, Stack, Flex, Heading, Link } from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils.js";
import { useTrackStore } from "~/store";
import { useLoaderData } from "react-router-dom";
import { useAccount } from "wagmi";
import { fetchEnsName } from "@wagmi/core";
import ProfileLinkButton from "~/components/ProfileLinkButton";
import FollowButton from "./components/FollowButton";
import AudioItem from "~/components/AudioItem";
import { BACKEND_API_URL } from "~/config";
import { Artist } from "~/types";

interface ProfileParams {
  artist: Artist;
}

export async function loader({ params }: any) {
  const { address } = params;
  if (!isAddress(address)) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const response = await fetch(`${BACKEND_API_URL}/v1/artists/${address}`);

  if (!response.ok) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const json = await response.json();
  const artist: Artist = json.artist;
  const ensName = await fetchEnsName({ address: artist.address });

  return { artist: { ...artist, ens: ensName } };
}

function Profile(): JSX.Element {
  const { tracks, fetchTracksByAddress } = useTrackStore();
  const { artist } = useLoaderData() as ProfileParams;
  const { address } = useAccount();

  useEffect(() => {
    fetchTracksByAddress(artist.address);
  }, [artist]);

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
        {artist?.ens ? (
          <Text>{artist?.ens}</Text>
        ) : (
          <>
            <Text>This Artist has no ENS Name.</Text>
            <Text fontSize="lg">
              Get it here 👉{" "}
              <Link href="https://ens.domains" isExternal>
                https://ens.domains
              </Link>
            </Text>
          </>
        )}
      </Text>

      <Text gridArea="header" textAlign="center" fontSize="sm" color="gray.600">
        <Link
          href={`https://etherscan.io/address/${artist.address}`}
          isExternal
        >
          {artist.address}
        </Link>
      </Text>

      <Stack spacing="4">
        {artist.address !== address ? (
          <FollowButton
            artist={artist}
            isFollowing={!!address && artist.followedBy.includes(address)}
          />
        ) : null}

        <Heading size="md">Followed By</Heading>
        {artist.followedBy.map((follow, index) => (
          <ProfileLinkButton address={follow} key={index} />
        ))}
        <Heading size="md">Following</Heading>
        {artist.following.map((follow, index) => (
          <ProfileLinkButton address={follow} key={index} />
        ))}
        <Box>
          <Heading size="md">Uploads</Heading>
          <Box
            gridArea="track-list"
            alignSelf="stretch"
            overflowY="auto"
            marginTop="6"
          >
            <Stack spacing={2} overflowY="auto">
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
