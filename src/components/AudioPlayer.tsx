import React, { useEffect, useRef, useState } from "react";
import {
  Stack,
  Text,
  Image,
  CardBody,
  Heading,
  Card,
  Box,
  Icon,
  Link,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { formatArtistName } from "~/utils";
import { Track } from "~/types";
import { IPFS_GATEWAY_URL } from "~/config";
import { css } from "@emotion/react";
import { usePlayerStore } from "~/store";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import HTML5AudioPlayer from "./HTML5AudioPlayer";
import { useEnsName } from "wagmi";

type AudioPlayerProps = {
  track: Track;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track }) => {
  const [_canPlay, setCanPlay] = useState(false);
  const { playing, setPlaying } = usePlayerStore();
  const { data: ens } = useEnsName({ address: track.artistAddress });
  const ref = useRef<HTMLAudioElement>(null);

  const isPlaying = playing?.audio === track.audio;

  const audioUrl = `${IPFS_GATEWAY_URL}/${track.audio}`;
  const imageUrl = `${IPFS_GATEWAY_URL}/${track.image}`;

  useEffect(() => {
    if (playing && playing.audio !== track.audio) {
      ref.current?.pause();
    }
  });

  const handlePlay = () => {
    const element = ref?.current;
    if (element) {
      if (element.paused) {
        element.play();
      } else {
        element.pause();
        setPlaying(null);
      }
    }
  };

  return (
    <Card
      direction="row"
      overflow="hidden"
      height="80px"
      padding="0"
      variant="outline"
      transition="all 200ms linear"
      cursor="default"
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
        onClick={() => handlePlay()}
        cursor="pointer"
      >
        <Icon
          position="absolute"
          left="20px"
          top="20px"
          width="40px"
          height="40px"
          color="white"
          opacity={isPlaying ? 1 : 0}
          as={isPlaying ? FaPause : FaPlay}
          className="play-icon"
        />
        <Image
          objectFit="cover"
          maxWidth="80px"
          maxHeight="80px"
          src={imageUrl}
          alt="Cover"
        />
      </Box>

      <Stack width="100%">
        <CardBody paddingY="0" paddingRight="0">
          <Stack paddingTop="10px">
            <Text color="gray.600">
              {formatArtistName({ address: track.artistAddress, ens })}
            </Text>
            <Heading margin="0" size="sm" fontSize="lg">
              {track.title}
            </Heading>
          </Stack>
        </CardBody>
      </Stack>
      <HTML5AudioPlayer
        onPlay={() => setPlaying(track)}
        // onPause={() => setPlaying(null)}
        // onEnded={() => setPlaying(null)}
        onCanPlay={() => setCanPlay(true)}
        src={audioUrl}
        audioRef={ref}
      />
      <CardFooter>
        <Button
          size="sm"
          as={Link}
          href={audioUrl}
          isExternal
          ml={1}
          color="gray.700"
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

export default AudioPlayer;
