import { Box, Stack, Text } from "@chakra-ui/react";
import { IPFS_ASSETS_CID, IPFS_GATEWAY_URL } from "~/config";

const IPFS_ASSETS_URL = `${IPFS_GATEWAY_URL}/${IPFS_ASSETS_CID}`;

function Community(): JSX.Element {
  return (
    <Stack alignItems="center">
      <Text
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="5xl"
        paddingY="10vh"
        textAlign="center"
      >
        Community Art
      </Text>
      <Text
        fontSize="large"
        lineHeight="200%"
        marginX={{ base: "1vw", medium: "15vw" }}
        textAlign="center"
      >
        Our first Upload ❤️
      </Text>

      <audio src={`${IPFS_ASSETS_URL}/FLUT.mp3`} autoPlay controls />

      <Box marginY="50">
        <Text
          fontSize="large"
          lineHeight="200%"
          marginX={{ base: "1vw", medium: "15vw" }}
          textAlign="center"
        ></Text>
        <img
          src={`${IPFS_ASSETS_URL}/plagueFlute.jpg`}
          width="500"
          height="500"
        />
      </Box>
    </Stack>
  );
}

export default Community;
