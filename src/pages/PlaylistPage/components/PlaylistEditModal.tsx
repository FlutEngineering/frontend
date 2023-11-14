import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { usePlaylistStore } from "~/store";
import type { Playlist } from "~/types";

interface PlaylistEditModalProps {
  playlist: Playlist;
  isOpen: boolean;
  onClose: () => void;
}

type UpdateParams = { title: string };

const PlaylistEditModal: React.FC<PlaylistEditModalProps> = ({
  playlist,
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState(playlist.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updatePlaylist } = usePlaylistStore();
  const toast = useToast();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const update = async ({ title }: UpdateParams) => {
    try {
      setIsLoading(true);
      const updatedPlaylist = await updatePlaylist(playlist, { title });
      setIsLoading(false);
      toast({
        title: "Updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(`/${updatedPlaylist.userId}/playlists/${updatedPlaylist.slug}`);
      console.log("👾", "new title =>", title);
      setTimeout(() => onClose(), 200);
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Error",
          description: e.message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          status: "error",
          isClosable: true,
        });
        console.log("👾", "Playlist update error =>", e);
      }
    }
  };

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
        <ModalBody>
          <FormLabel fontSize="sm" fontWeight="bold" color="gray.300">
            Title
          </FormLabel>
          <Input
            value={title}
            size="sm"
            mb={2}
            onChange={(event) => setTitle(event.target.value)}
            ref={inputRef}
          />
          <ButtonGroup>
            <Button
              marginY={3}
              isLoading={isLoading}
              loadingText="Updating"
              isDisabled={!title.length || isLoading}
              onClick={() => update({ title })}
            >
              Update
            </Button>
            <Button
              marginY={3}
              isDisabled={!title.length || isLoading}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlaylistEditModal;
