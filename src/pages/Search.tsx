import { Box, Stack, Input, Text, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import AudioItem from "~/components/AudioItem";
import { useTrackStore } from "~/store";

function Search(): JSX.Element {
  const { tracks, fetchTracks } = useTrackStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Grid
      gridTemplateRows="auto auto minmax(0, 1fr)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"header" "searchbar" "track-list"`}
      width="100%"
    >
      <Text
        gridArea="header"
        fontSize="3xl"
        fontWeight="bold"
        color="gray.600"
        marginY="1rem"
      >
        Browse All Uploads
      </Text>
      <Input
        gridArea="searchbar"
        variant="filled"
        placeholder="Search by Name (Coming Soon)"
        disabled
        marginBottom="4"
      />

      {/*<Stack direction="row" spacing={4} paddingY="1" paddingBottom="4">
         <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
          disabled
        >
          Ranking
        </Button>
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
          disabled
        >
          Recent
        </Button>
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
          disabled
        >
          Unranked
        </Button>
      </Stack>*/}
      <Box gridArea="track-list" alignSelf="stretch" overflowY="auto">
        <Stack spacing={2}>
          {tracks.map((track) => (
            <AudioItem track={track} key={track.title} />
          ))}
        </Stack>
      </Box>
    </Grid>
  );
}

export default Search;
