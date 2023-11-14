import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
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
import { useTrackStore } from "~/store";
import type { Track } from "~/types";

import TagInput from "~/pages/Upload/components/TagInput";

interface TrackEditModalProps {
  track: Track;
  isOpen: boolean;
  onClose: () => void;
}

interface TagStore {
  tags: string[];
  getTags: () => string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

type UpdateParams = { title?: string; tags?: string[] };

const MAX_TAGS = 10;

const TrackEditModal: React.FC<TrackEditModalProps> = ({
  track,
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState(track.title);
  const useTagStore = useMemo(
    () =>
      create<TagStore>((set, get) => ({
        tags: [...new Set(track.tags)],
        getTags: () => get().tags,
        // add tag validation
        addTag: (tag) => {
          const tags = get().tags;
          if (tags.length < MAX_TAGS) {
            set({ tags: [...new Set(get().tags).add(tag)] });
          }
        },
        removeTag: (tagToRemove) =>
          set({ tags: get().tags.filter((tag) => tag !== tagToRemove) }),
      })),
    [track.tags]
  );
  const { tags, addTag, removeTag } = useTagStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateTrack } = useTrackStore();
  const toast = useToast();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const update = async ({ title, tags }: UpdateParams) => {
    try {
      setIsLoading(true);
      const updatedTrack = await updateTrack(track, { title, tags });
      setIsLoading(false);
      toast({
        title: "Updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(`/${updatedTrack.artistAddress}/${updatedTrack.slug}`);
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
        console.log("👾", "Track update error =>", e);
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
          <TagInput
            size="sm"
            label={
              <FormLabel
                display="inline-block"
                verticalAlign="top"
                fontSize="sm"
                fontWeight="bold"
                color="gray.300"
              >
                Tags
              </FormLabel>
            }
            maxTags={MAX_TAGS}
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
            isInvalid={!tags.length}
            isDisabled={isLoading}
          />
          <ButtonGroup>
            <Button
              marginY={3}
              isLoading={isLoading}
              loadingText="Updating"
              isDisabled={
                !title.length || !tags.length || tags.length < 3 || isLoading
              }
              onClick={() => update({ title, tags })}
            >
              Update
            </Button>
            <Button
              marginY={3}
              isDisabled={
                !title.length || !tags.length || tags.length < 3 || isLoading
              }
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

export default TrackEditModal;
