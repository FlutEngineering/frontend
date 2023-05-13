import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
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
} from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils.js";
import { useEnsName, useAccount } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import { Track } from "~/types";
import { ipfsCidToUrl } from "~/utils";
import { create } from "zustand";
import TagBadge from "~/components/TagBadge";
import TagInput from "~/pages/Upload/components/TagInput";

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
  const image = ipfsCidToUrl(track.image);
  const { address } = useAccount();

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
          <Link href={image} isExternal>
            <Image
              width="200"
              height="200"
              minWidth="200"
              minHeight="200"
              borderRadius="md"
              overflow="hidden"
              src={image}
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
        </Box>
      </HStack>
      {address === track.artistAddress ? (
        <>
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
                Edit Tags
              </FormLabel>
            }
            maxTags={MAX_TAGS}
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
            isInvalid={!tags.length}
            // isDisabled={isUploading || isUploaded}
          />
          <Button
            isDisabled={!tags.length || tags.length < 3}
            onClick={async () => {
              await fetch(`${BACKEND_API_URL}/v1/tracks/${address}/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tags }),
              }).catch((e) => {
                console.log("error", e);
              });
            }}
          >
            Update
          </Button>
        </>
      ) : (
        <></>
      )}
    </VStack>
  );
}

export default TrackPage;
