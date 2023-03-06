import {
  Button,
  VStack,
  Text,
  Box,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useSongsStore } from "store";
import { useEffect } from "react";
import AudioPlayer from "components/AudioPlayer";

export default function Search() {
  const { songs, add, clear, getSongs } = useSongsStore();

  useEffect(() => {
    clear();
    getSongs();
  }, []);

  return (
    <Box>
      <Input variant="filled" placeholder="Search by Name" />

      <Stack direction="row" spacing={4} paddingY="1">
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
        >
          Ranking
        </Button>
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
        >
          Recent
        </Button>
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
        >
          Unranked
        </Button>
      </Stack>
      {songs?.length > 1 &&
        songs?.map((song, index) => {
          const audio = {
            name: song.name,
            url: `https://flutgate.4everland.link/ipfs/${song.cid}`,
          };
          return (
            <AudioPlayer key={index} cid={song?.cid.toString()} audio={audio} />
          );
        })}
    </Box>
  );
}
