import { useCallback, useMemo, useRef, useState } from "react";
import { create } from "zustand";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import type AvatarEditor from "react-avatar-editor";

import TagInput from "./TagInput";
import ImageDropzone from "./ImageDropzone";
import AudioInputPlayer from "./AudioInputPlayer";
import { BACKEND_API_URL } from "~/config";
import { Artist } from "~/types";
import { formatArtistName } from "~/utils";

interface AudioFileProps {
  audio: File;
  address: Artist["address"];
  ensName: Artist["ensName"];
  isEditing: boolean;
  onClick: () => void;
}

const MAX_TAGS = 10;

interface TagStore {
  tags: string[];
  getTags: () => string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

type UploadStates = "idle" | "initiated" | "uploading" | "success" | "error";

const AudioFile: React.FC<AudioFileProps> = ({
  audio,
  address,
  ensName,
  isEditing,
  onClick,
}) => {
  const [title, setTitle] = useState(
    audio.name.slice(0, audio.name.lastIndexOf("."))
  );
  const [image, setImage] = useState<File>();
  const [uploadState, setUploadState] = useState<UploadStates>("idle");
  const [isImageReady, setImageReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [useTagStore] = useState<() => TagStore>(() =>
    create<TagStore>((set, get) => ({
      tags: [],
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
    }))
  );
  const { tags, addTag, removeTag } = useTagStore();
  const imageEditor = useRef<AvatarEditor>(null);

  const handleFileUpload = useCallback(async () => {
    setUploadState("initiated");
    const canvas = imageEditor.current?.getImage();

    if (!canvas || !tags.length) {
      return;
    }

    const image = await new Promise<File>((resolve, reject) =>
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], "cover.jpg", { type: "image/jpeg" }));
        } else {
          reject(new Error("Image export error"));
        }
      })
    );

    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("image", image);
    formData.append("title", title);
    tags.forEach((tag) => formData.append("tags", tag));

    setUploadState("uploading");
    const response = await fetch(`${BACKEND_API_URL}/v1/tracks`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      setErrorMessage("Upload error");
    }

    const json = await response.json();

    if (json.error) {
      setUploadState("error");
      setErrorMessage(json.error);
      return;
    }

    setUploadState("success");
  }, [audio, title, address, tags, imageEditor]);

  const isUploadInitiated = uploadState === "initiated";
  const isUploading = uploadState === "uploading";
  const isUploaded = uploadState === "success";
  const isUploadError = uploadState === "error";
  const isExpanded = isEditing && !isUploaded;

  const cursor = useMemo(() => {
    if (isEditing) return "default";
    if (isUploading) return "wait";
    if (isUploaded || isUploadError) return "not-allowed";
    return "pointer";
  }, [isExpanded, isUploading]);

  const backgroundColor = useMemo(() => {
    if (isUploading) return "yellow.50";
    if (isUploaded) return "blue.50";
    if (isUploadError) return "red.50";
    return "white";
  }, [isUploading, isUploaded]);

  return (
    <Card
      direction="row"
      overflow="hidden"
      height={isExpanded ? "290px" : "100px"}
      padding={isExpanded ? "20px" : "0"}
      marginBottom="4"
      variant="outline"
      onClick={() => !isUploading && onClick()}
      cursor={cursor}
      transition="all 200ms linear"
      background={backgroundColor}
    >
      {isExpanded ? (
        <ImageDropzone
          image={image}
          onSelect={(file) => setImage(file)}
          editorRef={imageEditor}
          isInvalid={isUploadInitiated && !isImageReady}
          onImageReady={() => setImageReady(true)}
        />
      ) : (
        image && (
          <Image
            objectFit="cover"
            maxWidth="100px"
            maxHeight="100px"
            src={URL.createObjectURL(image)}
            alt="Cover"
          />
        )
      )}

      <Stack width="100%">
        <CardBody paddingY="0" paddingRight="0">
          <Stack paddingTop="20px" hidden={isExpanded}>
            <Text color="gray.600">
              {formatArtistName({
                address,
                ensName,
              })}
            </Text>
            <Heading margin="0" size="sm" fontSize="lg">
              {title}
            </Heading>
          </Stack>
          <Stack hidden={!isExpanded}>
            <FormControl isRequired>
              <FormLabel
                display="inline-block"
                verticalAlign="top"
                fontSize="sm"
                fontWeight="bold"
                color="gray.600"
              >
                Track title
              </FormLabel>
              <Input
                size="sm"
                placeholder="Track title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                minLength={1}
                isDisabled={isUploading || isUploaded}
              />
            </FormControl>
            <TagInput
              size="sm"
              label={
                <FormLabel
                  display="inline-block"
                  verticalAlign="top"
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.600"
                >
                  Tags
                </FormLabel>
              }
              maxTags={MAX_TAGS}
              tags={tags}
              addTag={addTag}
              removeTag={removeTag}
              isInvalid={isUploadInitiated && !tags.length}
              isDisabled={isUploading || isUploaded}
            />
            <AudioInputPlayer
              label={
                <FormLabel
                  display="inline-block"
                  verticalAlign="top"
                  fontSize="sm"
                  fontWeight="bold"
                  color="gray.600"
                >
                  Audio
                </FormLabel>
              }
              file={audio}
            />
          </Stack>
        </CardBody>
        {isExpanded && (
          <CardFooter paddingY="0" alignItems="center">
            <Button
              size="sm"
              leftIcon={<AiOutlineCloudUpload />}
              variant="outline"
              colorScheme="gray"
              marginTop="2px"
              aria-label="upload"
              onClick={() => handleFileUpload()}
              isDisabled={isUploading || isUploaded}
            >
              Upload
            </Button>
            {uploadState === "uploading" && (
              <Button
                isLoading
                loadingText="Uploading"
                colorScheme="teal"
                variant="outline"
              />
            )}
            <Text paddingLeft="2" fontSize="sm" color="red.500">
              {errorMessage}
            </Text>
          </CardFooter>
        )}
      </Stack>
    </Card>
  );
};

export default AudioFile;
