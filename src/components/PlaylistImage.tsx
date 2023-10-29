import { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { usePlaylistStore } from "~/store";
import { Playlist, Track } from "~/types";
import { ASSETS_URL } from "~/config";

interface PlaylistImageProps {
  playlist: Playlist;
  size?: number;
}

const PlaylistImage: React.FC<PlaylistImageProps> = ({
  playlist,
  size = 40,
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { fetchPlaylistTracks } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylistTracks(playlist).then(setTracks);
  }, [playlist.id]);

  if (!tracks) return null;

  if (tracks.length === 1) {
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        minWidth={`${size}px`}
        borderRadius="sm"
        overflow="hidden"
      >
        <Image
          objectFit="cover"
          maxWidth={`${size}px`}
          maxHeight={`${size}px`}
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${tracks[0].image}_160.jpg`}
        />
      </Box>
    );
  }

  if (tracks.length > 1 && tracks.length < 4) {
    return (
      <Box
        display="flex"
        width={`${size}px`}
        height={`${size}px`}
        minWidth={`${size}px`}
        borderRadius="sm"
        overflow="hidden"
      >
        <Image
          objectFit="cover"
          maxWidth={`${size / 2}px`}
          maxHeight={`${size}px`}
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${tracks[0].image}_160.jpg`}
        />
        <Image
          objectFit="cover"
          maxWidth={`${size / 2}px`}
          maxHeight={`${size}px`}
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${tracks[1].image}_160.jpg`}
        />
      </Box>
    );
  }

  if (tracks.length > 3) {
    return (
      <Box
        display="flex"
        width={`${size}px`}
        height={`${size}px`}
        minWidth={`${size}px`}
        borderRadius="sm"
        overflow="hidden"
      >
        <div>
          <Image
            objectFit="cover"
            maxWidth={`${size / 2}px`}
            maxHeight={`${size / 2}px`}
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[0].image}_160.jpg`}
          />
          <Image
            objectFit="cover"
            maxWidth={`${size / 2}px`}
            maxHeight={`${size / 2}px`}
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[1].image}_160.jpg`}
          />
        </div>

        <div>
          <Image
            objectFit="cover"
            maxWidth={`${size / 2}px`}
            maxHeight={`${size / 2}px`}
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[2].image}_160.jpg`}
          />
          <Image
            objectFit="cover"
            maxWidth={`${size / 2}px`}
            maxHeight={`${size / 2}px`}
            loading="lazy"
            alt="Cover"
            src={`${ASSETS_URL}/thumbnails/${tracks[3].image}_160.jpg`}
          />
        </div>
      </Box>
    );
  }

  return (
    <Box
      width={`${size}px`}
      height={`${size}px`}
      minWidth={`${size}px`}
      borderRadius="sm"
      overflow="hidden"
      backgroundColor="purple.500"
    />
  );
};

export default PlaylistImage;
