import { useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Stack,
  Grid,
  Icon,
  HStack,
  Input,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useTagStore, useTrackStore } from "~/store";
// import { ASSETS_URL } from "~/config";
import AudioItem from "~/components/AudioItem";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Search(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>();
  const tagsPerPage = 10;
  const [page, setPage] = useState(0);
  const { tags, fetchTags } = useTagStore();
  const { tracks, fetchTracks, fetchTracksByTag } = useTrackStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchTracksByTag(selectedTag);
    }
  }, [selectedTag, fetchTracksByTag]);

  return (
    <Grid
      gridTemplateRows="auto auto minmax(0, 1fr)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"header" "tag-list" "track-list"`}
      width="100%"
    >
      <Text
        gridArea="header"
        marginY="1rem"
        textAlign="center"
        fontSize="3xl"
        fontWeight="bold"
        color="gray.600"
      >
        Tags
      </Text>
      <Box gridArea="tag-list">
        <Flex
          width="100%"
          height="12vh"
          marginY="5"
          direction="row"
          justifyContent="space-between"
          borderRadius="25px"
        >
          <Button
            variant="outline"
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
              }
            }}
          >
            <Icon as={BiLeftArrow}></Icon>
          </Button>

          <Box overflowX="auto">
            {tags.map((tag, key) => {
              if (key >= page * tagsPerPage && key < (page + 1) * tagsPerPage) {
                return (
                  <Button
                    key={key}
                    variant={selectedTag === tag.name ? "solid" : "outline"}
                    borderWidth="1px"
                    marginY="1"
                    marginBottom="3"
                    _notLast={{ marginRight: 1 }}
                    onClick={() => setSelectedTag(tag.name)}
                  >
                    <Text>{tag.name}</Text>
                  </Button>
                );
              }
            })}
          </Box>
          <Button
            variant="outline"
            onClick={() => {
              if ((page + 1) * tagsPerPage < tags.length) {
                setPage(page + 1);
              }
            }}
          >
            <Icon as={BiRightArrow}></Icon>
          </Button>
        </Flex>
      </Box>

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
