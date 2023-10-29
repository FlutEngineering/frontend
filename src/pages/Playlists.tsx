import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Box, HStack, Stack, Heading } from "@chakra-ui/react";
import { useAuthStore, usePlaylistStore } from "~/store";

import PlaylistImage from "~/components/PlaylistImage";
import PlaylistCreateForm from "~/components/PlaylistCreateForm";

function Playlists(): JSX.Element {
  const navigate = useNavigate();
  const { user, fetchUser } = useAuthStore();
  const { createPlaylist } = usePlaylistStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const playlists = useMemo(() => {
    if (!user) return [];
    let result = user.playlists;
    // return result.sort((a, b) => b.updatedAt - a.updatedAt);
    return result;
  }, [user]);

  if (!user) return <div />;

  return (
    <Box width="100%" overflow="auto">
      {/* <Text */}
      {/*   marginY="1rem" */}
      {/*   textAlign="center" */}
      {/*   fontSize="2xl" */}
      {/*   fontWeight="bold" */}
      {/*   color="gray.100" */}
      {/* > */}
      {/*   Recently Added */}
      {/* </Text> */}

      {/* <Text */}
      {/*   marginY="1rem" */}
      {/*   textAlign="center" */}
      {/*   fontSize="2xl" */}
      {/*   fontWeight="bold" */}
      {/*   color="gray.100" */}
      {/* > */}
      {/*   Popular */}
      {/* </Text> */}

      {/* <HStack alignSelf="stretch" overflowX="auto"> */}
      {/*   {tracks */}
      {/*     .sort((a, b) => { */}
      {/*       return b.playCount - a.playCount; */}
      {/*     }) */}
      {/*     .map((track) => ( */}
      {/*       <AudioThumbnail track={track} key={track.id} /> */}
      {/*     ))} */}
      {/* </HStack> */}
      <Stack>
        <HStack justifyContent="space-between" lineHeight={4} color="gray.400">
          <Box width="40px" />
          <Heading fontSize="xs" flexGrow="1" paddingLeft={2}>
            NAME
          </Heading>
          <Heading fontSize="xs" textAlign="right" paddingRight="0.5rem">
            TRACKS
          </Heading>
        </HStack>
        <PlaylistCreateForm
          onSubmit={async (title) => {
            await createPlaylist(title, user.address);
            await fetchUser();
          }}
        />
        {playlists.map((playlist) => (
          <HStack
            key={playlist.id}
            justifyContent="space-between"
            width="100%"
            height="40px"
            maxHeight="40px"
            borderRadius="sm"
            cursor="pointer"
            overflow="hidden"
            _hover={{ background: "gray.600" }}
            onClick={() =>
              navigate(`/${playlist.userId}/playlists/${playlist.slug}`)
            }
            // onClick={async () => {
            //   await callback?.(playlist);
            //   onClose();
            // }}
          >
            <PlaylistImage playlist={playlist} />
            <Heading flexGrow="1" size="xs" paddingLeft={2}>
              {playlist.title}
            </Heading>
            <Box textAlign="right" color="gray.300" paddingRight="0.5rem">
              {playlist.trackCount}
            </Box>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}

export default Playlists;
