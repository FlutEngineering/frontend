import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { usePlayerStore } from "~/store";

type AudioInputPlayerProps = {
  label: React.ReactNode;
  file: File;
};

const AudioInputPlayer: React.FC<AudioInputPlayerProps> = ({ label, file }) => {
  const { pause } = usePlayerStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioObjectURL = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );
  const audioRef = useRef(new Audio(audioObjectURL));

  useEffect(() => {
    if (isPlaying) {
      pause(); // Pause global player
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Pause on unmount
  useEffect(() => () => audioRef.current.pause(), []);

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
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="play/pause"
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
            jiggle
            {file.name}
          </Text>
        </FormLabel>
      </InputGroup>
    </FormControl>
  );
};

export default AudioInputPlayer;
