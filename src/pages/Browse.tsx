import { Text, Box, Flex, Image } from "@chakra-ui/react";
import { ASSETS_URL } from "~/config";

const IMAGE_URLS = [
  "spaceMan.png",
  "musicMachine.png",
  "plagueFlute.png",
  "skywhales.png",
  "fluteTree.png",
  "monaLisa.png",
  "orbs.png",
  "ryoshiFlute1.png",
  "spaceMachine.png",
  "spaceMan.png",
  "musicMachine.png",
  "plagueFlute.png",
  "skywhales.png",
  "fluteTree.png",
  "monaLisa.png",
  "orbs.png",
  "ryoshiFlute1.png",
  "spaceMachine.png",
];

interface ImageGalleryProps {
  urls: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ urls }) => {
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      overflowX="auto"
      alignItems="center"
      justifyContent="flex-start"
      mt={8}
      mb={8}
    >
      {urls?.map((image, index) => (
        <Image
          key={index}
          src={`${ASSETS_URL}/genres/${image}`}
          margin="2"
          alt="track/genre/album image"
          width={{ base: "15vw", lg: "10vw" }}
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.2s",
          }}
          cursor="pointer"
        />
      ))}
    </Box>
  );
};

function Browse(): JSX.Element {
  return (
    <Box flexWrap="nowrap" overflowY="auto">
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres
        </Text>
        <ImageGallery urls={IMAGE_URLS} />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres
        </Text>
        <ImageGallery urls={IMAGE_URLS} />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres
        </Text>
        <ImageGallery urls={IMAGE_URLS} />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres
        </Text>
        <ImageGallery urls={IMAGE_URLS} />
      </Flex>
    </Box>
  );
}

export default Browse;
