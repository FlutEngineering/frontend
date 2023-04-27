import { useEffect, useState } from "react";
import { Text, Box, Button, Stack, Grid, Icon, HStack } from "@chakra-ui/react";
import { useTagStore, useTrackStore } from "~/store";
// import { ASSETS_URL } from "~/config";
import AudioItem from "~/components/AudioItem";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Browse(): JSX.Element {
  const { tracks, fetchTracks } = useTrackStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  console.log(tracks);
  return (
    <>
      <Box width="100%">
        <Text
          marginY="1rem"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="gray.600"
        >
          Recently Added
        </Text>

        <HStack alignSelf="stretch" overflowX="auto">
          {tracks
            .sort((a, b) => {
              return Date.parse(b.createdAt) - Date.parse(a.createdAt);
            })
            .map((track) => (
              <AudioItem track={track} key={track.title} />
            ))}
        </HStack>

        <Text
          marginY="1rem"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="gray.600"
        >
          Popular
        </Text>

        <HStack alignSelf="stretch" overflowX="auto">
          {tracks
            .sort((a, b) => {
              return b.playCount - a.playCount;
            })
            .map((track) => (
              <AudioItem track={track} key={track.title} />
            ))}
        </HStack>
      </Box>
    </>
  );
}

export default Browse;
