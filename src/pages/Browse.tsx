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
    <>
      <Box width="100%">
        <Text
          marginY="1rem"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="gray.600"
        >
          Recently Played
        </Text>

        <Box alignSelf="stretch" overflowX="auto"></Box>
        <Text
          marginY="1rem"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="gray.600"
        >
          Most Played
        </Text>
      </Box>
    </>
  );
}

export default Browse;
