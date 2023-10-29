import { useEffect, useMemo } from "react";
import {
  Box,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import {
  useAuthStore,
  usePlaylistSelectModalStore,
  usePlaylistStore,
} from "~/store";

import PlaylistImage from "./PlaylistImage";
import PlaylistCreateForm from "./PlaylistCreateForm";

const PlaylistSelectModal: React.FC = () => {
  const { user, fetchUser } = useAuthStore();
  const { createPlaylist } = usePlaylistStore();
  const { isOpen, onClose, callback, filter } = usePlaylistSelectModalStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const playlists = useMemo(() => {
    if (!user) return [];
    let result = user.playlists;
    if (filter) result = result.filter(filter);
    // return result.sort((a, b) => b.updatedAt - a.updatedAt);
    return result;
  }, [user, filter]);

  if (!user) return null;

  return (
    <Modal
      size="sm"
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Playlists</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <HStack
              justifyContent="space-between"
              lineHeight={4}
              color="gray.400"
            >
              <Box width="40px" />
              <Heading fontSize="xs" flexGrow="1" paddingLeft={2}>
                NAME
              </Heading>
              <Heading fontSize="xs" textAlign="right" paddingRight="0.5rem">
                TRACKS
              </Heading>
            </HStack>
            {playlists.map((playlist) => (
              <HStack
                key={playlist.id}
                justifyContent="space-between"
                width="100%"
                height="40px"
                maxHeight="40px"
                borderRadius="sm"
                cursor="pointer"
                overflow="hidden"
                _hover={{ background: "gray.600" }}
                onClick={async () => {
                  await callback?.(playlist);
                  onClose();
                }}
              >
                <PlaylistImage playlist={playlist} />
                <Heading flexGrow="1" size="xs" paddingLeft={2}>
                  {playlist.title}
                </Heading>
                <Box textAlign="right" color="gray.300" paddingRight="0.5rem">
                  {playlist.trackCount}
                </Box>
              </HStack>
            ))}
            <PlaylistCreateForm
              onSubmit={async (title) => {
                await createPlaylist(title, user.address);
                await fetchUser();
              }}
            />
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default PlaylistSelectModal;
