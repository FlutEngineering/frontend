import React, { useEffect, useRef, useState } from "react";
import { HStack, useToast } from "@chakra-ui/react";
import { ipfsCidToUrl } from "~/utils";
import { usePlayerStore } from "~/store";
import PlayerControls from "./components/PlayerControls";
import TrackInfo from "./components/TrackInfo";
import { BACKEND_API_URL } from "~/config";
type AudioPlayerProps = {};

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const { track, isPlaying, play, pause, togglePlay } = usePlayerStore();
  const toast = useToast();
  // Player hooks
  const [trackProgress, setTrackProgress] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const [isPlaycountUpdated, setIsPlaycountUpdated] = useState(false);
  const intervalRef = useRef<any>();
  const totalPlayTimeRef = useRef<any>();
  const audioRef = useRef(new Audio());
  const { duration } = audioRef.current;

  useEffect(() => {
    if (totalPlayTime / duration >= 0.85 && !isPlaycountUpdated) {
      const { id } = track;

      fetch(
        `${BACKEND_API_URL}/v1/tracks/playcount/?` +
          new URLSearchParams({ id }),
        {
          credentials: "include",
        }
      ).then(() => {
        setIsPlaycountUpdated(true);
        toast({
          title: "Playcount",
          description: `increased!`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      });
    }
  });

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      clearInterval(totalPlayTimeRef.current);
    },
    []
  );

  // Play after changing track
  useEffect(
    () =>
      usePlayerStore.subscribe(
        (state) => state.track,
        (track) => {
          if (track) {
            audioRef.current.pause();
            audioRef.current = new Audio(ipfsCidToUrl(track.audio));
            audioRef.current.play();
            setTrackProgress(0);
            setTotalPlayTime(0);
            startTimer();
          } else {
            audioRef.current.pause();
            pause();
            clearInterval(intervalRef.current);
            clearInterval(totalPlayTimeRef.current);
          }
        }
      ),
    []
  );

  const startTimer = () => {
    clearInterval(intervalRef.current);
    clearInterval(totalPlayTimeRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setTrackProgress(0);
        pause();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
    totalPlayTimeRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setTotalPlayTime(0);
        pause();
      } else {
        setTotalPlayTime((seconds) => seconds + 1);
      }
    }, 1000);
  };

  const onSeek = (value: number) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onSeekEnd = () => {
    if (!isPlaying) {
      play();
    }
    startTimer();
  };

  return !!track ? (
    <HStack
      flexGrow="1"
      padding="2"
      paddingLeft="3"
      background="gray.100"
      borderRadius="4"
    >
      <PlayerControls
        isPlaying={isPlaying}
        current={trackProgress}
        duration={duration}
        onSeek={onSeek}
        onSeekEnd={onSeekEnd}
        onPlayPauseClick={() => togglePlay()}
      />

      <TrackInfo track={track} marginLeft="4 !important" />
    </HStack>
  ) : null;
};

export default AudioPlayer;
