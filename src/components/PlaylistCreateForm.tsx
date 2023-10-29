import { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface PlaylistCreateFormProps {
  onSubmit: (title: string) => Promise<void>;
}

const PlaylistCreateForm: React.FC<PlaylistCreateFormProps> = ({
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  if (isEditing) {
    return (
      <HStack
        key="new-form"
        height="40px"
        maxHeight="40px"
        borderRadius="sm"
        cursor="pointer"
        overflow="hidden"
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.key === "Escape") {
            setIsEditing(false);
          }
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="40px"
          height="40px"
          minWidth="40px"
          backgroundColor="purple.500"
          borderRadius="sm"
        />
        <form
          style={{ flex: "1 0 auto" }}
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit(title);
            setIsEditing(false);
          }}
        >
          <InputGroup>
            <Input
              type="text"
              maxLength={30}
              paddingLeft={2}
              paddingRight="64px"
              fontWeight="500"
              fontFamily="heading"
              placeholder="New playlist name"
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
              _focusVisible={{
                borderColor: "purple.500",
                boxShadow: "none",
              }}
            />
            <InputRightElement width="66px">
              <IconButton
                size="xs"
                marginRight={1}
                type="submit"
                bg="green.500"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                aria-label="Submit"
                icon={<CheckIcon />}
              />
              <IconButton
                size="xs"
                aria-label="Cancel"
                icon={<CloseIcon />}
                bg="red.500"
                _hover={{ bg: "red.400" }}
                _active={{ bg: "red.600" }}
                onClick={() => setIsEditing(false)}
              />
            </InputRightElement>
          </InputGroup>
        </form>
        <Box borderRadius="sm" />
      </HStack>
    );
  } else {
    return (
      <HStack
        key="new-button"
        height="40px"
        maxHeight="40px"
        borderRadius="sm"
        cursor="pointer"
        overflow="hidden"
        _hover={{ background: "gray.600" }}
        onClick={async () => {
          setIsEditing(true);
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="40px"
          height="40px"
          minWidth="40px"
        >
          <AddIcon boxSize={5} />
        </Box>
        <Heading size="xs" paddingLeft={2}>
          Create new playlist
        </Heading>
        <Box borderRadius="sm" />
      </HStack>
    );
  }
};

export default PlaylistCreateForm;
