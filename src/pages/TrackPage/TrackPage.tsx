import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Stack,
  VStack,
  Box,
  Link,
  Heading,
  ButtonGroup,
  Button,
  IconButton,
  useToast,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { FaEdit, FaPause, FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { isAddress } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import { Track } from "~/types";
import { ipfsCidToUrl, tagSearchURL } from "~/utils";
import { usePlayerStore, useTrackStore } from "~/store";

import DeleteConfirmationModal from "~/components/DeleteConfirmationModal";
import TagBadge from "~/components/TagBadge";
import IPFSImage from "~/components/IPFSImage";
import TrackEditModal from "./components/TrackEditModal";
import ProfileLink from "~/components/ProfileLink";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface TrackParams {
  track: Track;
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
    `${BACKEND_API_URL}/v1/tracks/${address}/${slug}`
  );

  if (!response.ok) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const json = await response.json();

  return { track: json.track, slug };
}

function TrackPage(): JSX.Element {
  const { track, slug } = useLoaderData() as TrackParams;
  const imageUrl = ipfsCidToUrl(track.image);
  const { address } = useAccount();
  const navigate = useNavigate();
  const {
    track: current,
    isPlaying,
    playTrack,
    togglePlay,
    stop,
  } = usePlayerStore();
  const { deleteTrack } = useTrackStore();
  const isCurrentTrack = current && current?.audio === track.audio;
  const {
    isOpen: isTrackEditModalOpen,
    onOpen: openTrackEditModal,
    onClose: closeTrackEditModal,
  } = useDisclosure();
  const {
    isOpen: isConfirmModalOpen,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal,
  } = useDisclosure();

  const toast = useToast();

  const handleTrackDelete = async () => {
    try {
      await deleteTrack(track);
      toast({
        title: "Deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      if (isCurrentTrack) {
        stop();
      }
      navigate(`/search`);
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
        console.log("👾", "Track delete error =>", e);
      }
    }
  };

  return (
    <VStack
      width="100%"
      marginTop={{ base: 4, lg: 0 }}
      alignItems={{ base: "center", sm: "flex-start" }}
      gap={4}
      overflowY="scroll"
    >
      <Stack
        direction={{ base: "column", sm: "row" }}
        width="100%"
        marginTop={{ base: 4, lg: 0 }}
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={4}
      >
        <Box>
          <Link href={imageUrl} isExternal>
            <IPFSImage
              width={{ base: 300, sm: 200 }}
              height={{ base: 300, sm: 200 }}
              minWidth={{ base: 300, sm: 200 }}
              minHeight={{ base: 300, sm: 200 }}
              borderRadius="md"
              overflow="hidden"
              cid={track.image}
            />
          </Link>
        </Box>
        <Box>
          <Breadcrumb
            spacing="2px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <ProfileLink address={track.artistAddress} />
            </BreadcrumbItem>

            <BreadcrumbItem cursor="default">
              <Box fontSize="sm">tracks</Box>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading>{track.title}</Heading>
          <Box mb={2}>
            {track.tags.map((tag) => (
              <TagBadge
                tag={tag}
                key={tag}
                onClick={() => navigate(tagSearchURL(tag))}
              />
            ))}
          </Box>
          <ButtonGroup size="sm">
            <Button
              leftIcon={isCurrentTrack && isPlaying ? <FaPause /> : <FaPlay />}
              onClick={() =>
                !isCurrentTrack ? playTrack(track) : togglePlay()
              }
              aria-label="play"
            >
              Play
            </Button>
            {address === track.artistAddress && (
              <>
                <IconButton
                  icon={<FaEdit size="18" />}
                  onClick={openTrackEditModal}
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

      {isTrackEditModalOpen ? (
        <TrackEditModal
          track={track}
          isOpen={isTrackEditModalOpen}
          onClose={closeTrackEditModal}
        />
      ) : null}
      <DeleteConfirmationModal
        title="Delete track?"
        isOpen={isConfirmModalOpen}
        onConfirm={handleTrackDelete}
        onClose={closeConfirmModal}
      />
    </VStack>
  );
}

export default TrackPage;
