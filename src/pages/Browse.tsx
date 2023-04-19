import { useEffect, useState } from "react";
import { Text, Box, Button, Stack, Grid, Icon, HStack } from "@chakra-ui/react";
import { useTagStore, useTrackStore } from "~/store";
// import { ASSETS_URL } from "~/config";
import AudioItem from "~/components/AudioItem";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Browse(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>();
  const { tags, fetchTags } = useTagStore();
  const { tracks, fetchTracksByTag } = useTrackStore();

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
        <Box width="100%" height="15vh" overflowX="auto" margin="5">
          {tags.map((tag, key) => {
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
          })}
        </Box>
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

export default Browse;
