import { useMemo } from "react";
import { useEnsName } from "wagmi";
import { Box, HStack, StackProps, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { formatArtistName } from "~/utils";
import { Track } from "~/types";
import IPFSImage from "~/components/IPFSImage";

interface TrackInfoProps {
  track: Track;
}

const TrackInfo: React.FC<TrackInfoProps & StackProps> = ({
  track,
  ...props
}) => {
  const { data: ensName } = useEnsName({ address: track.artistAddress });
  const artist = useMemo(
    () => formatArtistName({ address: track.artistAddress, ensName }),
    [track, ensName]
  );
  return (
    <HStack
      as={RouterLink}
      to={`/${track.artistAddress}/${track.slug}`}
      width="180px"
      paddingRight="2"
      cursor="pointer"
      borderRadius="sm"
      overflow="hidden"
      border="1px solid"
      borderColor="transparent"
      _hover={{ background: "gray.600", borderColor: "gray.600" }}
      {...props}
    >
      <IPFSImage
        width="9"
        height="9"
        minWidth="9"
        minHeight="9"
        borderRadius="sm"
        overflow="hidden"
        cid={track.image}
      />
      <Box paddingBottom="0" overflow="hidden">
        <Text color="gray.300" fontSize="xs" lineHeight="1">
          {artist}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {track.title}
        </Text>
      </Box>
    </HStack>
  );
};

export default TrackInfo;
