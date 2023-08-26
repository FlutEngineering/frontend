import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useEnsName } from "wagmi";
import { css } from "@emotion/react";
import { Text, Image, Card, Box, Icon, VStack } from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { formatArtistName } from "~/utils";
import { usePlayerStore } from "~/store";
import { Track } from "~/types";
import { ASSETS_URL } from "~/config";

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
  const { data: ensName } = useEnsName({ address: track.artistAddress });

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
            src={`${ASSETS_URL}/thumbnails/${track.image}_160.jpg`}
            alt="Cover"
          />
        </Box>
      </Card>
      <Text
        as={RouterLink}
        to={`/${track.artistAddress}`}
        margin="2px !important"
        color="gray.300"
        fontSize="sm"
        _hover={{ textDecoration: "underline" }}
      >
        {formatArtistName({ address: track.artistAddress, ensName })}
      </Text>

      <Text
        as={RouterLink}
        to={`/${track?.artistAddress}/${track?.slug}`}
        size="sm"
        margin="0 !important"
        fontSize="md"
        fontWeight="bold"
        lineHeight="1"
      >
        {trimTitle(track.title)}
      </Text>
    </VStack>
  );
};

export default AudioThumbnail;
