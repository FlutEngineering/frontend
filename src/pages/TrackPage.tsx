import { useMemo, useState, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { create } from "zustand";
import {
  HStack,
  VStack,
  Button,
  Text,
  Heading,
  Box,
  Image,
  Link,
  FormLabel,
  Input,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { isAddress } from "ethers/lib/utils.js";
import { useEnsName, useAccount } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import { Track } from "~/types";
import { ipfsCidToUrl } from "~/utils";
import { usePlayerStore } from "~/store";

import TagInput from "~/pages/Upload/components/TagInput";
import TagBadge from "~/components/TagBadge";
import IPFSImage from "~/components/IPFSImage";

const MAX_TAGS = 10;

interface TagStore {
  tags: string[];
  getTags: () => string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

interface TrackParams {
  track: Track;
  slug: string;
}

type UploadStates = "idle" | "initiated" | "uploading" | "success" | "error";

export async function loader({ params }: any) {
  const { address, slug } = params;
  if (!isAddress(address) || !slug) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const response = await fetch(
    `${BACKEND_API_URL}/v1/tracks/${address}/${slug}`
  );

  if (!response.ok) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const json = await response.json();

  return { track: json.track, slug };
}

function TrackPage(): JSX.Element {
  const { track, slug } = useLoaderData() as TrackParams;
  const { data: ens } = useEnsName({ address: track.artistAddress });
  const artist = useMemo(() => ens || track.artistAddress, [track, ens]);
  const imageUrl = ipfsCidToUrl(track.image);
  const { address } = useAccount();
  const navigate = useNavigate();
  const { track: current, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { data: ensName } = useEnsName({ address: track.artistAddress });
  const isCurrentTrack = current && current?.audio === track.audio;

  const [useTagStore] = useState<() => TagStore>(() =>
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
    }))
  );
  const { tags, addTag, removeTag } = useTagStore();
  const [newTitle, setNewTitle] = useState(track.title || "");
  const [uploadState, setUploadState] = useState<UploadStates>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  const handleTrackUpdate = useCallback(async () => {
    setUploadState("initiated");
    if (!tags.length) {
      return;
    }
    const formData = new FormData();
    formData.append("title", newTitle);
    tags.forEach((tag) => formData.append("tags", tag));
    setUploadState("uploading");

    const response = await fetch(
      `${BACKEND_API_URL}/v1/tracks/${address}/${slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: newTitle, tags }),
      }
    );

    if (!response.ok) {
      setErrorMessage("Update error");
    }

    const json = await response.json();
    if (json.error) {
      setUploadState("error");
      setErrorMessage(json.error);
      return;
    }

    setUploadState("success");
    navigate(`/${track.artistAddress}/${json.track.slug}`);
    toast({
      title: "Update Successful",
      description: "Your track has been updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, [address, tags]);

  const isUploadInitiated = uploadState === "initiated";
  const isUploading = uploadState === "uploading";
  const isUploaded = uploadState === "success";
  const isUploadError = uploadState === "error";

  return (
    <VStack
      width="100%"
      marginTop={{ base: 4, lg: 0 }}
      alignItems="flex-start"
      gap={4}
    >
      <HStack
        width="100%"
        marginTop={{ base: 4, lg: 0 }}
        alignItems="flex-start"
        gap={4}
      >
        <Box>
          <Link href={imageUrl} isExternal>
            <IPFSImage
              width="200"
              height="200"
              minWidth="200"
              minHeight="200"
              borderRadius="md"
              overflow="hidden"
              cid={track.image}
            />
          </Link>
        </Box>
        <Box>
          <Text color="gray.500" fontSize="sm">
            {artist}
          </Text>
          <Heading>{track.title}</Heading>
          {track.tags.map((tag) => (
            <TagBadge tag={tag} key={tag} />
          ))}
          <Box
            position="relative"
            width="80px"
            height="80px"
            minWidth="80px"
            marginTop="20px"
            onClick={() => (!isCurrentTrack ? playTrack(track) : togglePlay())}
            cursor="pointer"
          >
            <Icon
              position="absolute"
              left={isCurrentTrack && isPlaying ? "25px" : "27px"}
              top="25px"
              width="30px"
              height="30px"
              color="white"
              as={isCurrentTrack && isPlaying ? FaPause : FaPlay}
              className="play-icon"
            />
            <svg viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="transparent"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8, 8"
                style={
                  isCurrentTrack && isPlaying
                    ? {
                        strokeDashoffset: 0,
                        transition: "all 200s linear",
                      }
                    : {
                        strokeDashoffset: 1000,
                        transition: "all 1s ease",
                      }
                }
              />
            </svg>
          </Box>
        </Box>
      </HStack>

      {address === track.artistAddress ? (
        <Box>
          <Box
            flex="1"
            textAlign="left"
            fontWeight="bold"
            color="gray.600"
            marginBottom="1.5rem"
          >
            Edit Track Details
          </Box>
          <FormLabel fontSize="sm" fontWeight="bold" color="gray.600">
            Update Title
          </FormLabel>

          <Input
            placeholder="Track title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            maxLength={100}
            minLength={1}
            marginY={3}
            isDisabled={isUploading}
          />

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
                Update Tags
              </FormLabel>
            }
            maxTags={MAX_TAGS}
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
            isInvalid={!tags.length}
            isDisabled={isUploading}
          />
          <Button
            marginY={3}
            isLoading={uploadState === "uploading"}
            loadingText="Updating"
            isDisabled={
              !newTitle.length || !tags.length || tags.length < 3 || isUploading
            }
            onClick={() => handleTrackUpdate()}
          >
            Update
          </Button>
          <Text paddingLeft="2" fontSize="sm" color="red.500">
            {errorMessage}
          </Text>
        </Box>
      ) : (
        <></>
      )}
    </VStack>
  );
}

export default TrackPage;
