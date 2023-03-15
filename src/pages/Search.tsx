import { Button, Box, Stack, Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import AudioItem from "~/components/AudioItem";
import { useTrackStore } from "~/store";

function Search(): JSX.Element {
  const { tracks, fetchTracks } = useTrackStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Box flexGrow="1">
      <Text fontSize="3xl" fontWeight="bold" color="gray.600" marginY="1rem">
        Browse All Uploads
      </Text>
      <Input
        variant="filled"
        placeholder="Search by Name (Coming Soon)"
        disabled
        marginY="1rem"
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
      <Stack overflowY="scroll" spacing={2}>
        {tracks.map((track) => (
          <AudioItem track={track} key={track.title} />
        ))}
      </Stack>
    </Box>
  );
}

export default Search;
