import { useState, useMemo, useRef, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Heading,
  ButtonGroup,
  Button,
  useToast,
  Grid,
  Breadcrumb,
  BreadcrumbItem,
  IconButton,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { FaEdit, FaPause, FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";
import { isAddress } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import { Playlist, Track } from "~/types";
import { tagSearchURL } from "~/utils";
import { usePlayerStore, usePlaylistStore } from "~/store";

import DeleteConfirmationModal from "~/components/DeleteConfirmationModal";
import AudioItem, { AudioItemLoader } from "~/components/AudioItem";
import PlaylistImage from "~/components/PlaylistImage";
import ProfileLink from "~/components/ProfileLink";
import PlaylistEditModal from "./components/PlaylistEditModal";

interface PlaylistParams {
  playlist: Playlist;
  slug: string;
}

export async function loader({ params }: any) {
  const { address, slug } = params;
  if (!isAddress(address) || !slug) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const response = await fetch(
    `${BACKEND_API_URL}/v1/playlists/${address}/${slug}`
  );

  if (!response.ok) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const json = await response.json();

  return { playlist: json.playlist, slug };
}

function PlaylistPage(): JSX.Element {
  const navigate = useNavigate();
  const { playlist } = useLoaderData() as PlaylistParams;
  const listRef = useRef<HTMLDivElement>(null);
  const { fetchPlaylistTracks, deletePlaylist, removeTrackFromPlaylist } =
    usePlaylistStore();
  const { address } = useAccount();
  const defaultItemLimit = useMemo(
    () => (listRef.current?.offsetHeight || 80) / 88,
    [listRef.current]
  );
  const [itemLimit, setItemLimit] = useState(defaultItemLimit);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [updated, setUpdated] = useState(Date.now());
  const refresh = () => setUpdated(Date.now());
  const { track: current, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const isCurrentPlaylist = useMemo(
    () =>
      current && playlistTracks.map((track) => track.id).includes(current.id),
    [current, playlistTracks]
  );
  const {
    isOpen: isPlaylistEditModalOpen,
    onOpen: openPlaylistEditModal,
    onClose: closePlaylistEditModal,
  } = useDisclosure();
  const {
    isOpen: isConfirmModalOpen,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal,
  } = useDisclosure();

  useEffect(() => {
    fetchPlaylistTracks(playlist).then(setPlaylistTracks);
  }, [playlist.id, updated]);

  const loadMore = (n: number) => {
    setItemLimit(itemLimit + n);
  };

  const toast = useToast();

  const handlePlaylistDelete = async () => {
    try {
      await deletePlaylist(playlist);
      toast({
        title: "Deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      if (isCurrentPlaylist) {
        stop();
      }
      navigate(`/playlists`);
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Error",
          description: e.message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          status: "error",
          isClosable: true,
        });
        console.log("👾", "Playlist delete error =>", e);
      }
    }
  };

  const tracksToRender = playlistTracks.slice(0, itemLimit);

  return (
    <Grid
      gridTemplateRows="auto minmax(0, 100%)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"heading" "track-list"`}
      width="100%"
    >
      <Stack
        gridArea="heading"
        direction={{ base: "column", sm: "row" }}
        width="100%"
        marginTop={{ base: 4, lg: 0 }}
        marginBottom={4}
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
      >
        <Box>
          <PlaylistImage playlist={playlist} size={100} />
        </Box>
        <Box>
          <Breadcrumb
            spacing="2px"
            separator={<ChevronRightIcon color="gray.500" />}
            marginTop="-7px"
          >
            <BreadcrumbItem>
              <ProfileLink address={playlist.userId} />
            </BreadcrumbItem>

            <BreadcrumbItem cursor="default">
              <Box fontSize="sm">playlists</Box>
              {/* TODO: uncomment after implementing public playlists */}
              {/* <BreadcrumbLink href={`/${address}/playlists`} fontSize="sm"> */}
              {/*   playlists */}
              {/* </BreadcrumbLink> */}
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading marginBottom={2}>{playlist.title}</Heading>
          {/* <Box mb={2}> */}
          {/*   {track.tags.map((tag) => ( */}
          {/*     <TagBadge */}
          {/*       tag={tag} */}
          {/*       key={tag} */}
          {/*       onClick={() => navigate(tagSearchURL(tag))} */}
          {/*     /> */}
          {/*   ))} */}
          {/* </Box> */}
          <ButtonGroup size="sm">
            {playlistTracks.length > 0 && (
              <Button
                leftIcon={
                  isCurrentPlaylist && isPlaying ? <FaPause /> : <FaPlay />
                }
                onClick={() =>
                  !isCurrentPlaylist
                    ? playTrack(playlistTracks[0])
                    : togglePlay()
                }
                aria-label="play"
              >
                Play
              </Button>
            )}
            {address === playlist.userId && (
              <>
                <IconButton
                  icon={<FaEdit size="18" />}
                  onClick={() => openPlaylistEditModal()}
                  aria-label="edit"
                />
                <IconButton
                  icon={<MdDelete size="20" />}
                  bg="red.500"
                  _hover={{ bg: "red.400" }}
                  _active={{ bg: "red.600" }}
                  onClick={() => openConfirmModal()}
                  aria-label="edit"
                />
              </>
            )}
          </ButtonGroup>
        </Box>
      </Stack>

      {/* <HStack gridArea="searchbar" marginBottom="4"> */}
      {/*   <Input */}
      {/*     variant="filled" */}
      {/*     _focusVisible={{ borderColor: "purple.500" }} */}
      {/*     _placeholder={{ color: "white" }} */}
      {/*     placeholder="Search" */}
      {/*     value={searchInput} */}
      {/*     onChange={handleSearchInputChange} */}
      {/*     tabIndex={1} */}
      {/*   /> */}
      {/*   <Select */}
      {/*     flex="1 0 auto" */}
      {/*     width="max-content" */}
      {/*     variant="filled" */}
      {/*     icon={<RiArrowUpDownFill />} */}
      {/*     textAlign="center" */}
      {/*     value={sortingMode} */}
      {/*     onChange={handleSortingModeChange} */}
      {/*   > */}
      {/*     <option value="best-match" hidden={!searchInput}> */}
      {/*       Best Match */}
      {/*     </option> */}
      {/*     <option value="latest">Latest</option> */}
      {/*     <option value="oldest">Oldest</option> */}
      {/*     <option value="alphabetically">A-Z</option> */}
      {/*   </Select> */}
      {/* </HStack> */}

      <Box
        gridArea="track-list"
        alignSelf="stretch"
        overflowY="auto"
        ref={listRef}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={() => loadMore(20)}
          hasMore={tracksToRender.length < playlistTracks.length}
          loader={<AudioItemLoader key="loader" marginBottom={2} />}
          useWindow={false}
        >
          {tracksToRender.map((track) => (
            <AudioItem
              track={track}
              key={track.id}
              onTagClick={(tag) => navigate(tagSearchURL(tag))}
              showMenu={false}
              buttons={
                <Tooltip
                  label="Remove from playlist"
                  placement="top"
                  openDelay={500}
                >
                  <IconButton
                    size="sm"
                    icon={<CloseIcon />}
                    variant="ghost"
                    onClick={async () => {
                      await removeTrackFromPlaylist(playlist, track.id);
                      refresh();
                    }}
                    aria-label="Remove from playlist"
                  />
                </Tooltip>
              }
              marginBottom={2}
            />
          ))}
        </InfiniteScroll>
      </Box>
      {isPlaylistEditModalOpen ? (
        <PlaylistEditModal
          playlist={playlist}
          isOpen={isPlaylistEditModalOpen}
          onClose={closePlaylistEditModal}
        />
      ) : null}
      <DeleteConfirmationModal
        title="Delete playlist?"
        isOpen={isConfirmModalOpen}
        onConfirm={handlePlaylistDelete}
        onClose={closeConfirmModal}
      />
    </Grid>
  );
}

export default PlaylistPage;
