import { useMemo } from "react";
import {
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  // SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  duration?: number;
  current: number;
  onSeek: (progress: number) => void;
  onSeekEnd: (progress: number) => void;
}

const formatTime = (time?: number) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};

const TimeLabel: React.FC<{ time: string }> = ({ time }) => (
  <Text paddingBottom="2px" color="gray.600" fontSize="md" userSelect="none">
    {time}
  </Text>
);

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPauseClick,
  duration,
  current,
  onSeek,
  onSeekEnd,
}) => {
  const formattedCurrent = useMemo(
    () => formatTime(current),
    [current, duration]
  );
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  return (
    <HStack flexGrow="1">
      <IconButton
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        size="md"
        width="8"
        height="8"
        minWidth="8"
        minHeight="8"
        variant="unstyled"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="sm"
        onClick={() => onPlayPauseClick()}
        aria-label="play/pause"
      />
      <TimeLabel time={formattedCurrent} />
      <Slider
        flexGrow="1"
        paddingY="16px !important"
        defaultValue={0}
        min={0}
        max={duration || 0}
        value={current || 0}
        onChange={onSeek}
        onChangeEnd={onSeekEnd}
        isDisabled={!duration}
        aria-label="track-progress"
      >
        <SliderTrack>
          <SliderFilledTrack hidden={!duration} />
        </SliderTrack>
        {/* <SliderThumb hidden={!duration} /> */}
      </Slider>
      <TimeLabel time={formattedDuration} />
    </HStack>
  );
};

export default PlayerControls;
