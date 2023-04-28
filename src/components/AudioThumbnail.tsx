import React from "react";
import {
  Stack,
  Text,
  Image,
  CardBody,
  Card,
  Box,
  Icon,
  Link,
  CardFooter,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { ipfsCidToUrl } from "~/utils";
import { Track } from "~/types";
import { css } from "@emotion/react";
import { usePlayerStore } from "~/store";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import TagBadge from "./TagBadge";
import ProfileLinkButton from "~/components/ProfileLinkButton";

type AudioItemProps = {
  track: Track;
};

const trimTitle = (title: string) => {
  if (title.length > 20) {
    return title.slice(0, 14) + "..." + title.slice(-3);
  }
  return title;
};

const AudioThumbnail: React.FC<AudioItemProps> = ({ track }) => {
  const { track: current, isPlaying, playTrack, togglePlay } = usePlayerStore();
  // const { data: ensName } = useEnsName({ address: track.artistAddress });

  const isCurrentTrack = current && current?.audio === track.audio;
  return (
    <VStack
      flex="1 0 auto"
      height="190px"
      transition="all 200ms linear"
      cursor="default"
      borderColor={isCurrentTrack ? "blue.300" : undefined}
      css={css`
        &:hover .play-icon {
          opacity: 1;
          transition: opacity 200ms ease;
        }
      `}
    >
      <Card>
        <Box
          onClick={() => (!isCurrentTrack ? playTrack(track) : togglePlay())}
          cursor="pointer"
        >
          <Icon
            position="absolute"
            left="30px"
            top="30px"
            width="60px"
            height="60px"
            color="white"
            opacity={isCurrentTrack ? 1 : 0}
            as={isCurrentTrack && isPlaying ? FaPause : FaPlay}
            className="play-icon"
          />
          <Image
            objectFit="cover"
            maxWidth="120"
            maxHeight="120px"
            src={ipfsCidToUrl(track.image)}
            alt="Cover"
          />
        </Box>
      </Card>
      <Stack paddingTop="1" spacing="0">
        <ProfileLinkButton address={track.artistAddress} />
      </Stack>
      <Text
        size="sm"
        fontSize="lg"
        fontWeight="bold"
        paddingBottom="6px"
        paddingTop="2px"
        lineHeight="1"
      >
        {trimTitle(track.title)}
      </Text>
    </VStack>
  );
};

export default AudioThumbnail;
