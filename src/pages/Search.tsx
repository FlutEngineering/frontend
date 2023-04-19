// import { Box, Stack, Input, Text, Grid } from "@chakra-ui/react";
// import { useEffect } from "react";
// import AudioItem from "~/components/AudioItem";
// import { useTrackStore } from "~/store";

// function Search(): JSX.Element {
//   const { tracks, fetchTracks } = useTrackStore();

//   useEffect(() => {
//     fetchTracks();
//   }, []);

//   return (
//     <Grid
//       gridTemplateRows="auto auto minmax(0, 1fr)"
//       gridTemplateColumns="1fr"
//       gridTemplateAreas={`"header" "searchbar" "track-list"`}
//       width="100%"
//     >
//       <Text
//         gridArea="header"
//         fontSize="3xl"
//         fontWeight="bold"
//         color="gray.600"
//         marginY="1rem"
//       >
//         Browse All Uploads
//       </Text>
// <Input
//   gridArea="searchbar"
//   variant="filled"
//   placeholder="Search by Name (Coming Soon)"
//   disabled
//   marginBottom="4"
// />

// <Stack direction="row" spacing={4} paddingY="1" paddingBottom="4">
//    <Button
//     leftIcon={<RiArrowUpDownFill />}
//     colorScheme="gray"
//     variant="outline"
//     disabled
//   >
//     Ranking
//   </Button>
//   <Button
//     leftIcon={<RiArrowUpDownFill />}
//     colorScheme="gray"
//     variant="outline"
//     disabled
//   >
//     Recent
//   </Button>
//   <Button
//     leftIcon={<RiArrowUpDownFill />}
//     colorScheme="gray"
//     variant="outline"
//     disabled
//   >
//     Unranked
//   </Button>
// </Stack>
//       <Box gridArea="track-list" alignSelf="stretch" overflowY="auto">
//         <Stack spacing={2}>
//           {tracks.map((track) => (
//             <AudioItem track={track} key={track.title} />
//           ))}
//         </Stack>
//       </Box>
//     </Grid>
//   );
// }

// export default Search;

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
} from "@chakra-ui/react";
import { useTagStore, useTrackStore } from "~/store";
// import { ASSETS_URL } from "~/config";
import AudioItem from "~/components/AudioItem";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Search(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>();
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
        <Box
          width="100%"
          height="12vh"
          overflowX="auto"
          marginY="5"
          // backgroundColor="grey"
          borderRadius="25px"
        >
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

export default Search;
