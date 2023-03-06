import {
  Text,
  Box,
  Button,
  Card,
  CardBody,
  Icon,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface Audio {
  name: string;
  url: string;
}

interface AudioPlayerProps {
  audio: Audio;
  cid: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio, cid }) => {
  const [isPlaying, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement>();

  const handlePlay = () => {
    if (ref.current && ref.current) {
      setPlaying(ref.current.paused);
      ref.current.paused ? ref.current.play() : ref.current.pause();
    }
  };

  const url = cid ? `https://flutgate.4everland.link/ipfs/${cid}` : audio.url;

  return (
    <Box width="100%">
      <Card size="sm" cursor="default" bg={cid ? "green.50" : "white"}>
        <CardBody p={1} pl={2} pr={2} display="flex" alignItems="center">
          <Button
            mr={2}
            colorScheme="blue"
            size="sm"
            width="30px"
            height="30px"
            borderRadius="50%"
            onClick={() => handlePlay()}
          >
            {isPlaying ? (
              <Icon as={FaPause} color="white" />
            ) : (
              <Icon as={FaPlay} color="white" ml="2px" />
            )}
          </Button>
          <Text
            mb="4px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {audio.name || cid}
          </Text>
          {cid && (
            <Link
              href={url}
              isExternal
              ml={1}
              color="gray.700"
              fontSize="xs"
              fontWeight="bold"
              whiteSpace="nowrap"
            >
              IPFS <ExternalLinkIcon mx="2px" />
            </Link>
          )}
        </CardBody>
        <audio ref={ref}>
          <source src={url} />
          Your browser does not support HTML5 audio.
        </audio>
      </Card>
    </Box>
  );
};

export default AudioPlayer;
