import { useEffect } from "react";
import { Text, Box, Stack, Flex, Heading, Link, Grid } from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils.js";
import { useTrackStore } from "~/store";
import { useLoaderData } from "react-router-dom";
import { useAccount, useEnsName } from "wagmi";
import { fetchEnsName } from "@wagmi/core";
import ProfileLinkButton from "~/components/ProfileLinkButton";
import FollowButton from "./components/FollowButton";
import AudioItem from "~/components/AudioItem";
import { BACKEND_API_URL } from "~/config";
import { Artist } from "~/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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

  return { artist };
}

function Profile(): JSX.Element {
  const { tracks, fetchTracksByAddress } = useTrackStore();
  const { artist } = useLoaderData() as ProfileParams;
  const { address } = useAccount();
  const { data: ensName, isSuccess: isEnsLoaded } = useEnsName({
    address: artist.address,
  });

  useEffect(() => {
    fetchTracksByAddress(artist.address);
  }, [artist]);

  return (
    <Grid
      gridTemplateRows="auto auto minmax(0, 1fr)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"header" "follows" "track-list"`}
      width="100%"
      gridRowGap={4}
    >
      <Stack gridArea="header">
        <Text
          marginY="1rem"
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          margin="0"
        >
          {ensName && <Text>{ensName}</Text>}
          {isEnsLoaded && !ensName && address === artist.address && (
            <>
              <Text>You have no ENS Name.</Text>
              <Text fontSize="lg">
                Get it here 👉{" "}
                <Link href="https://ens.domains" isExternal>
                  https://ens.domains
                </Link>
              </Text>
            </>
          )}
        </Text>

        <Text textAlign="center" fontSize="sm" color="gray.100">
          <Link
            href={`https://etherscan.io/address/${artist.address}`}
            isExternal
          >
            {artist.address}
            <ExternalLinkIcon marginLeft="1" marginTop="-4px" />
          </Link>
        </Text>
      </Stack>

      <Stack gridArea="follows" spacing="2">
        {artist.address !== address ? (
          <FollowButton
            artist={artist}
            isFollowing={!!address && artist.followedBy.includes(address)}
          />
        ) : null}
        {artist.followedBy.length > 0 && (
          <>
            <Heading size="md">Followed By</Heading>
            {artist.followedBy.map((follow, index) => (
              <ProfileLinkButton address={follow} key={index} />
            ))}
          </>
        )}
        {artist.following.length > 0 && (
          <>
            <Heading size="md">Following</Heading>
            {artist.following.map((follow, index) => (
              <ProfileLinkButton address={follow} key={index} />
            ))}
          </>
        )}
      </Stack>

      <Stack gridArea="track-list">
        <Heading size="md">Uploads</Heading>
        <Box alignSelf="stretch" overflowY="auto">
          <Stack spacing={2} paddingBottom="2">
            {tracks.map((track) => (
              <AudioItem track={track} key={track.title} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Grid>
  );
}

export default Profile;
