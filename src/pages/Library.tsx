import { VStack, Text, Icon, Flex, Stack, Box } from "@chakra-ui/react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useTrackStore } from "~/store";
import { useEffect } from "react";
import AudioPlayer from "~/components/AudioPlayer";
import { useAccount } from "wagmi";

function Library(): JSX.Element {
  const { address } = useAccount();
  const { tracks, fetchTracks } = useTrackStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Box flexGrow="1">
      <Text fontSize="3xl" fontWeight="bold" color="gray.600" marginY="1rem">
        Your Uploads
      </Text>
      <Stack overflowY="scroll" spacing={2}>
        {tracks.map((track) => {
          if (track?.artistAddress === address) {
            return <AudioPlayer track={track} key={track.title} />;
          }
        })}
      </Stack>
    </Box>
  );
}

export default Library;
