import { useEffect, useState } from "react";
import { Box, Stack, Grid, Text, Input, Button } from "@chakra-ui/react";
import { RiArrowUpDownFill } from "react-icons/ri";

import { useTagStore, useTrackStore } from "~/store";
import AudioItem from "~/components/AudioItem";

function Search(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string>();
  const tagsPerPage = 10;
  const [page, setPage] = useState(0);
  const { tags, fetchTags } = useTagStore();
  const { tracks, fetchTracks, fetchTracksByTag } = useTrackStore();

  useEffect(() => {
    fetchTracks();
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchTracksByTag(selectedTag);
    }
  }, [selectedTag, fetchTracksByTag]);

  // return (
  //   <Grid
  //     gridTemplateRows="auto auto minmax(0, 1fr)"
  //     gridTemplateColumns="1fr"
  //     gridTemplateAreas={`"header" "searchbar" "track-list"`}
  //     width="100%"
  //   >
  //     <Text
  //       gridArea="header"
  //       fontSize="3xl"
  //       fontWeight="bold"
  //       color="gray.600"
  //       marginY="1rem"
  //     >
  //       Browse All Uploads
  //     </Text>
  //     <Input
  //       gridArea="searchbar"
  //       variant="filled"
  //       placeholder="Search by Name (Coming Soon)"
  //       disabled
  //       marginBottom="4"
  //     />

  //     {/* <Stack direction="row" spacing={4} paddingY="1" paddingBottom="4"> */}
  //     {/*   <Button */}
  //     {/*     leftIcon={<RiArrowUpDownFill />} */}
  //     {/*     colorScheme="gray" */}
  //     {/*     variant="outline" */}
  //     {/*     disabled */}
  //     {/*   > */}
  //     {/*     Ranking */}
  //     {/*   </Button> */}
  //     {/*   <Button */}
  //     {/*     leftIcon={<RiArrowUpDownFill />} */}
  //     {/*     colorScheme="gray" */}
  //     {/*     variant="outline" */}
  //     {/*     disabled */}
  //     {/*   > */}
  //     {/*     Recent */}
  //     {/*   </Button> */}
  //     {/*   <Button */}
  //     {/*     leftIcon={<RiArrowUpDownFill />} */}
  //     {/*     colorScheme="gray" */}
  //     {/*     variant="outline" */}
  //     {/*     disabled */}
  //     {/*   > */}
  //     {/*     Unranked */}
  //     {/*   </Button> */}
  //     {/* </Stack> */}
  //     <Box gridArea="track-list" alignSelf="stretch" overflowY="auto">
  //       <Stack spacing={2} paddingBottom="2">
  //         {tracks.map((track) => (
  //           <AudioItem track={track} key={track.title} />
  //         ))}
  //       </Stack>
  //     </Box>
  //   </Grid>
  // );

  // -----------------------

  return (
    <Grid
      gridTemplateRows="auto auto minmax(0, 1fr)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"track-list"`}
      width="100%"
    >
      {/* <Box gridArea="tag-list"> */}
      {/*   <Flex */}
      {/*     width="100%" */}
      {/*     height="12vh" */}
      {/*     direction="row" */}
      {/*     justifyContent="space-between" */}
      {/*     borderRadius="25px" */}
      {/*   > */}
      {/*     <Button */}
      {/*       variant="outline" */}
      {/*       onClick={() => { */}
      {/*         if (page > 0) { */}
      {/*           setPage(page - 1); */}
      {/*         } */}
      {/*       }} */}
      {/*     > */}
      {/*       <Icon as={BiLeftArrow}></Icon> */}
      {/*     </Button> */}
      {/*     <Box overflowX="auto"> */}
      {/*       {tags.map((tag, key) => { */}
      {/*         if (key >= page * tagsPerPage && key < (page + 1) * tagsPerPage) { */}
      {/*           return ( */}
      {/*             <Button */}
      {/*               key={key} */}
      {/*               variant={selectedTag === tag.name ? "solid" : "outline"} */}
      {/*               borderWidth="1px" */}
      {/*               _notLast={{ marginRight: 1 }} */}
      {/*               onClick={() => setSelectedTag(tag.name)} */}
      {/*             > */}
      {/*               <Text>{tag.name}</Text> */}
      {/*             </Button> */}
      {/*           ); */}
      {/*         } */}
      {/*       })} */}
      {/*     </Box> */}
      {/*     <Button */}
      {/*       variant="outline" */}
      {/*       onClick={() => { */}
      {/*         if ((page + 1) * tagsPerPage < tags.length) { */}
      {/*           setPage(page + 1); */}
      {/*         } */}
      {/*       }} */}
      {/*     > */}
      {/*       <Icon as={BiRightArrow}></Icon> */}
      {/*     </Button> */}
      {/*   </Flex> */}
      {/* </Box> */}

      {/* <Input */}
      {/*   gridArea="searchbar" */}
      {/*   variant="filled" */}
      {/*   placeholder="Search by Name (Coming Soon)" */}
      {/*   disabled */}
      {/*   marginBottom="4" */}
      {/* /> */}

      {/* <Stack */}
      {/*   gridArea="sort-buttons" */}
      {/*   direction="row" */}
      {/*   spacing={4} */}
      {/*   paddingY="1" */}
      {/*   paddingBottom="4" */}
      {/* > */}
      {/*   <Button */}
      {/*     leftIcon={<RiArrowUpDownFill />} */}
      {/*     colorScheme="gray" */}
      {/*     variant="outline" */}
      {/*     size="sm" */}
      {/*     disabled */}
      {/*   > */}
      {/*     Ranking */}
      {/*   </Button> */}
      {/*   <Button */}
      {/*     leftIcon={<RiArrowUpDownFill />} */}
      {/*     colorScheme="gray" */}
      {/*     variant="outline" */}
      {/*     size="sm" */}
      {/*     disabled */}
      {/*   > */}
      {/*     Recent */}
      {/*   </Button> */}
      {/*   <Button */}
      {/*     leftIcon={<RiArrowUpDownFill />} */}
      {/*     colorScheme="gray" */}
      {/*     variant="outline" */}
      {/*     size="sm" */}
      {/*     disabled */}
      {/*   > */}
      {/*     Unranked */}
      {/*   </Button> */}
      {/* </Stack> */}

      <Box gridArea="track-list" alignSelf="stretch" overflowY="auto">
        <Stack spacing={2} paddingBottom="2">
          {tracks.map((track) => (
            <AudioItem track={track} key={track.title} />
          ))}
        </Stack>
      </Box>
    </Grid>
  );
}

export default Search;
