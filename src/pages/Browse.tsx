import { useEffect, useState } from "react";
import { Text, Box, Button, Stack, Grid } from "@chakra-ui/react";
import { useTagStore, useTrackStore } from "~/store";
// import { ASSETS_URL } from "~/config";
import AudioItem from "~/components/AudioItem";

// const IMAGE_URLS = [
//   "spaceMan.png",
//   "musicMachine.png",
//   "plagueFlute.png",
//   "skywhales.png",
//   "fluteTree.png",
//   "monaLisa.png",
//   "orbs.png",
//   "ryoshiFlute1.png",
//   "spaceMachine.png",
//   "spaceMan.png",
//   "musicMachine.png",
//   "plagueFlute.png",
//   "skywhales.png",
//   "fluteTree.png",
//   "monaLisa.png",
//   "orbs.png",
//   "ryoshiFlute1.png",
//   "spaceMachine.png",
// ];

// interface ImageGalleryProps {
//   urls: string[];
// }

// const ImageGallery: React.FC<ImageGalleryProps> = ({ urls }) => {
//   return (
//     <Box
//       display="flex"
//       flexWrap="nowrap"
//       overflowX="auto"
//       alignItems="center"
//       justifyContent="flex-start"
//       mt={8}
//       mb={8}
//     >
//       {urls?.map((image, index) => (
//         <Image
//           key={index}
//           src={`${ASSETS_URL}/genres/${image}`}
//           margin="2"
//           alt="track/genre/album image"
//           width={{ base: "15vw", lg: "10vw" }}
//           _hover={{
//             transform: "scale(1.05)",
//             transition: "transform 0.2s",
//           }}
//           cursor="pointer"
//         />
//       ))}
//     </Box>
//   );
// };

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
