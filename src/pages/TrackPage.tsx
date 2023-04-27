import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { HStack, Text, Heading, Box, Image, Link } from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils.js";
import { useEnsName } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import { Track } from "~/types";
import { ipfsCidToUrl } from "~/utils";
import TagBadge from "~/components/TagBadge";

interface TrackParams {
  track: Track;
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
  console.log("🛤", json.track);
  return { track: json.track };
}

function TrackPage(): JSX.Element {
  const { track } = useLoaderData() as TrackParams;
  const { data: ens } = useEnsName({ address: track.artistAddress });
  const artist = useMemo(() => ens || track.artistAddress, [track, ens]);
  const image = ipfsCidToUrl(track.image);

  return (
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
  );
}

export default TrackPage;
