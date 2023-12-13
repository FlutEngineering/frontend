import React, { useEffect, useRef, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { HStack, StackProps, IconButton } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ipfsCidToUrl } from "~/utils";
import { usePlayerStore, useAuthStore, useTrackStore } from "~/store";

import PlayerControls from "./components/PlayerControls";
import TrackInfo from "./components/TrackInfo";

const AudioPlayer: React.FC<StackProps> = (props) => {
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
  const intervalRef = useRef<any>();
  const audioRef = useRef(new Audio());
  const { duration } = audioRef.current;

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
            startTimer();
          } else {
            audioRef.current.pause();
            pause();
            clearInterval(intervalRef.current);
          }
        }
      ),
    []
  );

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setTrackProgress(0);
        pause();
      } else {
        setTrackProgress(audioRef.current.currentTime);
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
    <HStack padding="6px" background="gray.700" borderRadius="4" {...props}>
      <PlayerControls
        isPlaying={isPlaying}
        current={trackProgress}
        duration={duration}
        onSeek={onSeek}
        onSeekEnd={onSeekEnd}
        onPlayPauseClick={() => togglePlay()}
      />
      {user && address && (
        <IconButton
          icon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
          size="lg"
          variant="unstyled"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="6"
          height="6"
          minWidth="6"
          minHeight="6"
          borderRadius="50%"
          onClick={() => handleLike(track.id)}
          aria-label="like/unlike"
        />
      )}
      <TrackInfo track={track} />
    </HStack>
  ) : null;
};

export default AudioPlayer;
