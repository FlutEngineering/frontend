import { useEffect } from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import { useTrackStore } from "~/store";
import AudioThumbnail from "~/components/AudioThumbnail";

function Browse(): JSX.Element {
  const { tracks, fetchTracks } = useTrackStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <Text
        marginY="1rem"
        textAlign="center"
        fontSize="2xl"
        fontWeight="bold"
        color="gray.100"
      >
        Recently Added
      </Text>

      <HStack alignSelf="stretch" overflowX="auto">
        {tracks
          .sort((a, b) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          })
          .map((track) => (
            <AudioThumbnail track={track} key={track.title} />
          ))}
      </HStack>

      <Text
        marginY="1rem"
        textAlign="center"
        fontSize="2xl"
        fontWeight="bold"
        color="gray.100"
      >
        Popular
      </Text>

      <HStack alignSelf="stretch" overflowX="auto">
        {tracks
          .sort((a, b) => {
            return b.playCount - a.playCount;
          })
          .map((track) => (
            <AudioThumbnail track={track} key={track.title} />
          ))}
      </HStack>
    </Box>
  );
}

export default Browse;
