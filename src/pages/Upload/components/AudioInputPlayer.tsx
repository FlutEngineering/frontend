import React, { useMemo, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import HTML5AudioPlayer from "~/components/HTML5AudioPlayer";

type AudioInputPlayerProps = {
  label: React.ReactNode;
  file: File;
};

const AudioInputPlayer: React.FC<AudioInputPlayerProps> = ({ label, file }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  const audioObjectURL = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );

  const handlePlay = () => {
    const element = ref?.current;
    if (element) {
      element.paused ? element.play() : element.pause();
    }
  };

  return (
    <FormControl>
      {label}

      <InputGroup size="sm">
        <InputLeftElement>
          <IconButton
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            size="xs"
            width="8"
            height="8"
            borderRadius="sm"
            onClick={() => handlePlay()}
            aria-label="play/pause"
            isDisabled={!canPlay}
          />
        </InputLeftElement>
        <FormLabel
          width="100%"
          height="8"
          marginRight="0"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="inherit"
          borderRadius="sm"
          outline="2px solid transparent"
          pointerEvents="none"
          _hover={{ borderColor: "gray.300" }}
        >
          <Text marginLeft="10" color="gray.500">
            {file.name}
          </Text>
        </FormLabel>
      </InputGroup>
      {audioObjectURL && (
        <HTML5AudioPlayer
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onCanPlay={() => setCanPlay(true)}
          src={audioObjectURL}
          audioRef={ref}
        />
      )}
    </FormControl>
  );
};

export default AudioInputPlayer;
