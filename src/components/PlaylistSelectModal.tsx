import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  useAuthStore,
  usePlaylistSelectModalStore,
  usePlaylistStore,
} from "~/store";
import { ASSETS_URL } from "~/config";
import { Playlist, Track } from "~/types";

interface PlaylistImageProps {
  playlist: Playlist;
}

const PlaylistImage: React.FC<PlaylistImageProps> = ({ playlist }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { fetchPlaylistTracks } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylistTracks(playlist).then(setTracks);
  }, [playlist.id]);

  if (!tracks) return null;

  if (tracks.length === 1) {
    return (
      <Box
        width="40px"
        height="40px"
        minWidth="40px"
        borderRadius="sm"
        overflow="hidden"
      >
        <Image
          objectFit="cover"
          maxWidth="40px"
          maxHeight="40px"
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${tracks[0].image}_160.jpg`}
        />
      </Box>
    );
  }

  if (tracks.length > 1 && tracks.length < 4) {
    return (
      <Box
        display="flex"
        width="40px"
        height="40px"
        minWidth="40px"
        borderRadius="sm"
        overflow="hidden"
      >
        <Image
          objectFit="cover"
          maxWidth="20px"
          maxHeight="40px"
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${tracks[0].image}_160.jpg`}
        />
        <Image
          objectFit="cover"
          maxWidth="20px"
          maxHeight="40px"
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${tracks[1].image}_160.jpg`}
        />
      </Box>
    );
  }

  if (tracks.length > 3) {
    return (
      <Box
        display="flex"
        width="40px"
        height="40px"
        minWidth="40px"
        borderRadius="sm"
        overflow="hidden"
      >
        <div>
          <Image
            objectFit="cover"
            maxWidth="20px"
            maxHeight="20px"
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[0].image}_160.jpg`}
          />
          <Image
            objectFit="cover"
            maxWidth="20px"
            maxHeight="20px"
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[1].image}_160.jpg`}
          />
        </div>

        <div>
          <Image
            objectFit="cover"
            maxWidth="20px"
            maxHeight="20px"
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[2].image}_160.jpg`}
          />
          <Image
            objectFit="cover"
            maxWidth="20px"
            maxHeight="20px"
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[3].image}_160.jpg`}
          />
        </div>
      </Box>
    );
  }

  return (
    <Box
      width="40px"
      height="40px"
      minWidth="40px"
      borderRadius="sm"
      overflow="hidden"
      backgroundColor="purple.500"
    />
  );
};

interface PlaylistCreateFormProps {
  onSubmit: (title: string) => Promise<void>;
  onModalClose: () => void;
}

interface PlaylistCreateFormHandle {
  onEsc: () => void;
}

const PlaylistCreateForm = forwardRef<
  PlaylistCreateFormHandle,
  PlaylistCreateFormProps
>(({ onSubmit, onModalClose }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  useImperativeHandle(
    ref,
    () => ({
      onEsc: () => (isEditing ? setIsEditing(false) : onModalClose()),
    }),
    [isEditing, setIsEditing]
  );

  if (isEditing) {
    return (
      <HStack
        key="new-form"
        height="40px"
        maxHeight="40px"
        borderRadius="sm"
        cursor="pointer"
        overflow="hidden"
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
});

const PlaylistSelectModal: React.FC = () => {
  const { user, fetchUser } = useAuthStore();
  const { createPlaylist } = usePlaylistStore();
  const { isOpen, onClose, callback, filter } = usePlaylistSelectModalStore();
  const createFormRef = useRef<PlaylistCreateFormHandle>(null);

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
      onEsc={() => createFormRef.current?.onEsc()}
      closeOnEsc={false}
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
              onModalClose={onClose}
              ref={createFormRef}
            />
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default PlaylistSelectModal;
