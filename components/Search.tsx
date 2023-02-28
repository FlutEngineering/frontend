import {
  Button,
  VStack,
  Text,
  Box,
  Stack,
  Input,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { RiArrowUpDownFill } from "react-icons/ri";
import useGetCIDs from "hooks/useGetCIDs";
export default function Search() {
  const CIDs = useGetCIDs();
  return (
    <Box>
      <Input variant="filled" placeholder="Search by Name" />

      <Stack direction="row" spacing={4} paddingY="1">
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
        >
          Ranking
        </Button>
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
        >
          Recent
        </Button>
        <Button
          leftIcon={<RiArrowUpDownFill />}
          colorScheme="gray"
          variant="outline"
        >
          Unranked
        </Button>
      </Stack>
    </Box>
  );
}
