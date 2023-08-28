import React from "react";
import {
  Stack,
  Text,
  CardBody,
  Card,
  Box,
  Icon,
  Link,
  CardFooter,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useEnsName } from "wagmi";
import { Link as RouterLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { css } from "@emotion/react";
import { formatArtistName, ipfsCidToUrl } from "~/utils";
import { usePlayerStore } from "~/store";
import { ASSETS_URL } from "~/config";
import type { Track } from "~/types";

import TagBadge from "./TagBadge";

type AudioItemProps = {
  track: Track;
  onTagClick?: (tag: string) => void;
};

const AudioItem: React.FC<AudioItemProps> = ({ track, onTagClick }) => {
  const { track: current, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { data: ensName } = useEnsName({ address: track.artistAddress });
  const isCurrentTrack = current && current?.audio === track.audio;

  return (
    <Card
      flex="1 0 auto"
      direction="row"
      overflow="hidden"
      height="80px"
      padding="0"
      variant="outline"
      transition="all 200ms linear"
      cursor="default"
      borderColor={isCurrentTrack ? "purple.500" : undefined}
      css={css`
        &:hover .play-icon {
          opacity: 1;
          transition: opacity 200ms ease;
        }
      `}
    >
      <Box
        width="80px"
        height="80px"
        minWidth="80px"
        onClick={() => (!isCurrentTrack ? playTrack(track) : togglePlay())}
        cursor="pointer"
      >
        <Icon
          position="absolute"
          left="20px"
          top="20px"
          width="40px"
          height="40px"
          color="white"
          opacity={isCurrentTrack ? 1 : 0}
          as={isCurrentTrack && isPlaying ? FaPause : FaPlay}
          className="play-icon"
        />
        <Image
          objectFit="cover"
          maxWidth="80px"
          maxHeight="80px"
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${track.image}_160.jpg`}
        />
      </Box>

      <Stack width="100%">
        <CardBody
          as={Stack}
          width="100%"
          paddingY="0"
          paddingRight="0"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Stack paddingTop="1" spacing="0">
            <Box>
              <Text
                as={RouterLink}
                to={`/${track.artistAddress}`}
                color="gray.300"
                fontSize="sm"
                margin="0"
                _hover={{ textDecoration: "underline" }}
              >
                {formatArtistName({ address: track.artistAddress, ensName })}
              </Text>
            </Box>

            <Box>
              <Text
                as={RouterLink}
                to={`/${track.artistAddress}/${track.slug}`}
                size="sm"
                fontSize="lg"
                fontWeight="bold"
                paddingBottom="6px"
                paddingTop="2px"
                lineHeight="1"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {track.title}
              </Text>
            </Box>

            <HStack>
              {track.tags.map((tag) => (
                <TagBadge
                  tag={tag}
                  key={tag}
                  onClick={onTagClick ? () => onTagClick(tag) : undefined}
                />
              ))}
            </HStack>
          </Stack>
        </CardBody>
      </Stack>

      <CardFooter alignItems="center">
        <Button
          size="sm"
          as={Link}
          href={ipfsCidToUrl(track.audio)}
          isExternal
          ml={1}
          color="gray.200"
          fontSize="xs"
          fontWeight="bold"
          whiteSpace="nowrap"
        >
          IPFS
          <ExternalLinkIcon mx="2px" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AudioItem;
