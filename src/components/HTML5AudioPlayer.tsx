import { CSSProperties, useEffect, useRef } from "react";

interface HTML5AudioPlayerProps {
  autoPlay?: boolean;
  children?: React.ReactNode;
  className?: string;
  controls?: boolean;
  controlsList?: string;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  id?: string;
  listenInterval?: number;
  loop?: boolean;
  muted?: boolean;
  onAbort?: (e: Event) => void;
  onCanPlay?: (e: Event) => void;
  onCanPlayThrough?: (e: Event) => void;
  onEnded?: (e: Event) => void;
  onError?: (e: Event) => void;
  onListen?: (time: number) => void;
  onLoadedMetadata?: (e: Event) => void;
  onPause?: (e: Event) => void;
  onPlay?: (e: Event) => void;
  onSeeked?: (e: Event) => void;
  onVolumeChanged?: (e: Event) => void;
  preload?: "" | "none" | "metadata" | "auto";
  src?: string; // Not required b/c can use <source>
  style?: CSSProperties;
  title?: string;
  // volume: number;
  audioRef?: React.RefObject<HTMLAudioElement>;
}

const HTML5AudioPlayer: React.FC<HTML5AudioPlayerProps> = ({
  autoPlay,
  children,
  className,
  controls,
  // controlsList,
  crossOrigin,
  id,
  // listenInterval,
  loop,
  muted,
  // onAbort,
  onCanPlay,
  // onCanPlayThrough,
  onEnded,
  // onError,
  // onListen,
  // onLoadedMetadata,
  onPause,
  onPlay,
  // onSeeked,
  // onVolumeChanged,
  preload,
  src,
  style,
  title,
  // volume = 1.0,
  audioRef,
}) => {
  const defaultRef = useRef<HTMLAudioElement>(null);
  const ref = audioRef || defaultRef;

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    onPlay && element.addEventListener("play", onPlay);
    onPause && element.addEventListener("pause", onPause);
    onEnded && element.addEventListener("ended", onEnded);
    onCanPlay && element.addEventListener("canplay", onCanPlay);

    return () => {
      onPlay && element.removeEventListener("play", onPlay);
      onPause && element.removeEventListener("pause", onPause);
      onEnded && element.removeEventListener("ended", onEnded);
      onCanPlay && element.removeEventListener("canplay", onCanPlay);
    };
  }, [ref, onPlay, onPause, onEnded, onCanPlay]);

  const incompatibilityMessage = children || (
    <p>
      Your browser does not support the <code>audio</code> element.
    </p>
  );
  return (
    <audio
      autoPlay={autoPlay}
      className={`react-audio-player ${className}`}
      controls={controls}
      crossOrigin={crossOrigin}
      id={id}
      loop={loop}
      muted={muted}
      preload={preload}
      ref={ref}
      src={src}
      style={style}
      title={title ? title : src}
    >
      {incompatibilityMessage}
    </audio>
  );
};

export default HTML5AudioPlayer;
