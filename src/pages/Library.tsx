import { VStack, Text, Icon, Flex } from "@chakra-ui/react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

function Library(): JSX.Element {
  return (
    <Flex grow="1" alignItems="center" justifyContent="center">
      <VStack>
        <Text fontSize="xxx-large">Coming Soon</Text>
        <Icon as={HiOutlineWrenchScrewdriver} w="5vw" h="5vh" />
      </VStack>
    </Flex>
  );
}

export default Library;
