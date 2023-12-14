import { Text, Stack, Grid, Box } from "@chakra-ui/react";
import { usePlayerStore, useTrackStore } from "~/store";
import { useEffect } from "react";
import AudioItem from "~/components/AudioItem";
import { useAccount } from "wagmi";

function Library(): JSX.Element {
  const { address } = useAccount();
  const { tracks, fetchTracks } = useTrackStore();
  const { playTrack } = usePlayerStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Grid
      gridTemplateRows="auto minmax(0, 1fr)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"header" "track-list"`}
      width="100%"
    >
      <Text
        gridArea="header"
        fontSize="3xl"
        fontWeight="bold"
        color="gray.600"
        marginY="1rem"
      >
        Your Uploads
      </Text>
      <Box gridArea="track-list" alignSelf="stretch" overflowY="auto">
        <Stack spacing={2}>
          {tracks.map((track, index) => {
            if (track?.artistAddress === address) {
              return (
                <AudioItem
                  track={track}
                  key={track.title}
                  onPlayClick={() => playTrack(track, tracks, index)}
                />
              );
            }
          })}
        </Stack>
      </Box>
    </Grid>
  );
}

export default Library;
