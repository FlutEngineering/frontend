import { Button, useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import type { Artist } from "~/types";

interface FollowButtonProps {
  artist: Artist;
  isFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ artist, isFollowing }) => {
  const toast = useToast();
  const { address } = useAccount();

  if (isFollowing) {
    return (
      <Button
        colorScheme="blue"
        width="5rem"
        variant="outline"
        onClick={() =>
          fetch(`${BACKEND_API_URL}/v1/me/unfollow/${artist.address}`, {
            credentials: "include",
          }).then(() => {
            toast({
              title: "Unfollowed",
              description: `${artist.address}`,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          })
        }
      >
        Unfollow
      </Button>
    );
  }

  return (
    <Button
      colorScheme="blue"
      width="5rem"
      variant="outline"
      onClick={() => {
        if (!address) {
          toast({
            title: "Login to follow this artist",
            status: "warning",
            duration: 4000,
            isClosable: true,
          });
        } else {
          fetch(`${BACKEND_API_URL}/v1/me/follow/${artist.address}`, {
            credentials: "include",
          }).then(() => {
            toast({
              title: "Following",
              description: `${artist.address}`,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          });
        }
      }}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
