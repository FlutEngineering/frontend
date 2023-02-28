import {
  Button,
  VStack,
  Text,
  Box,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
  Image,
} from "@chakra-ui/react";
import useGetAlbumImages from "hooks/useGetAlbumImages";
// import useGetCIDs from "hooks/useGetCIDs";
import { useAudioStore } from "store";

const ImageGallery = ({ imageURLs }) => {
  console.log("imageURLs", imageURLs);
  if (imageURLs) {
    return (
      // <Box maxW="70vw" mx="auto" overflowX="auto">
      <Box
        display="flex"
        flexWrap="nowrap"
        overflowX="auto"
        alignItems="center"
        justifyContent="center"
        mt={8}
        mb={8}
      >
        {imageURLs?.map((image, index) => (
          <Image
            key={index}
            src={image}
            margin="2"
            alt="SongImg"
            width={{ base: "15vw", lg: "10vw" }}
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.2s",
            }}
          />
        ))}
      </Box>
    );
  }
  return <></>;
};

export default function Browse() {
  // const { data: imgURLs } = useGetAlbumImages();
  // const { data: CIDs } = useGetCIDs();
  const { getCIDs } = useAudioStore();

  return (
    <Box flexWrap="nowrap" overflowY="auto">
      {/* <Button onClick={getCIDs} /> */}
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres{" "}
        </Text>
        {/* {imgURLs ? <ImageGallery imageURLs={imgURLs.slice(0, 25)} /> : <></>} */}
        <ImageGallery
          imageURLs={[
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
          ]}
        />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres{" "}
        </Text>
        {/* {imgURLs ? <ImageGallery imageURLs={imgURLs.slice(0, 25)} /> : <></>} */}
        <ImageGallery
          imageURLs={[
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
          ]}
        />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres{" "}
        </Text>
        {/* {imgURLs ? <ImageGallery imageURLs={imgURLs.slice(0, 25)} /> : <></>} */}
        <ImageGallery
          imageURLs={[
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
          ]}
        />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.600">
          Genres{" "}
        </Text>
        {/* {imgURLs ? <ImageGallery imageURLs={imgURLs.slice(0, 25)} /> : <></>} */}
        <ImageGallery
          imageURLs={[
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
            "/spaceMan.png",
            "/musicMachine.png",
            "/plagueFlute.png",
            "/skywhales.png",
            "/fluteTree.png",
            "/monaLisa.png",
            "/orbs.png",
            "/ryoshiFlute1.png",
            "/spaceMachine.png",
          ]}
        />
      </Flex>
    </Box>
  );
}
