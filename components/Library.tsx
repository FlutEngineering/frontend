import {
  Button,
  VStack,
  Text,
  Box,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
  Center,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

export default function Library() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <VStack>
        <Text fontSize="xxx-large">Coming Soon</Text>
        <Icon as={HiOutlineWrenchScrewdriver} w="5vw" h="5vh" />
      </VStack>
    </Flex>
  );
}
