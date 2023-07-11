import React, { useEffect, useRef, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { HStack, Button, Icon } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BACKEND_API_URL } from "~/config";
import { ipfsCidToUrl } from "~/utils";
import { usePlayerStore, useAuthStore, useTrackStore } from "~/store";

import PlayerControls from "./components/PlayerControls";
import TrackInfo from "./components/TrackInfo";

type AudioPlayerProps = {};

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const { track, isPlaying, play, pause, togglePlay } = usePlayerStore();
  const { like, unlike } = useTrackStore();
  const { user, fetchUser } = useAuthStore();
  const { address } = useAccount();

  const isLiked = useMemo(
    () => (user && track ? user.likes.includes(track.id) : undefined),
    [user, track]
  );

  const handleLike = (id: string) =>
    (isLiked ? unlike(id) : like(id)).then(fetchUser);

  // Player hooks
  const [trackProgress, setTrackProgress] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const [isPlaycountUpdated, setIsPlaycountUpdated] = useState(false);
  const intervalRef = useRef<any>();
  const totalPlayTimeRef = useRef<any>();
  const audioRef = useRef(new Audio());
  const { duration } = audioRef.current;

  useEffect(() => {
    if (track && !isPlaycountUpdated && totalPlayTime / duration >= 0.85) {
      const id = track.id;

      fetch(`${BACKEND_API_URL}/v1/tracks/playcount/${id}`, {
        method: "POST",
        credentials: "include",
      })
        .then(() => {
          setIsPlaycountUpdated(true);
          // toast({
          //   title: "Playcount",
          //   description: `increased!`,
          //   status: "success",
          //   duration: 4000,
          //   isClosable: true,
          // });
        })
        .catch(() => {
          // console.log("👾", "Playcount was not increased");
        });
    }
  }, [track, totalPlayTime, duration, isPlaycountUpdated]);

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
            setIsPlaycountUpdated(false);
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
      {user && address && (
        <Button
          borderRadius="50%"
          width="40px"
          height="40px"
          onClick={() => handleLike(track.id)}
        >
          <Icon as={isLiked ? AiFillHeart : AiOutlineHeart} />
        </Button>
      )}
      <TrackInfo track={track} marginLeft="4 !important" />
    </HStack>
  ) : null;
};

export default AudioPlayer;
