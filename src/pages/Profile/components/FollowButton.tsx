import { Button, useToast, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "~/config";
import type { Artist, Follows } from "~/types";

interface FollowButtonProps {
  toFollow: string;
  followedBy: string;
  artist: any;
}
const FollowButton: React.FC<FollowButtonProps> = ({
  toFollow,
  followedBy,
  artist,
}) => {
  const toast = useToast();
  const { address } = useAccount();
  if (
    artist?.followedBy.find((obj: Follows) => {
      return obj.followerId === address;
    })
  ) {
    return (
      <Button
        colorScheme="blue"
        width="5rem"
        variant="outline"
        onClick={async () => {
          await fetch(
            `${BACKEND_API_URL}/v1/artist/unfollow/${toFollow}/${followedBy}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          ).then((response) => {
            toast({
              title: "Unfollowed",
              description: `${toFollow}`,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          });
        }}
      >
        Unfollow
      </Button>
    );
  }
  return (
    <>
      {toFollow !== followedBy && (
        <Button
          colorScheme="blue"
          width="5rem"
          variant="outline"
          onClick={async () => {
            if (!followedBy) {
              toast({
                title: "Login",
                description: "to follow this artist",
                status: "warning",
                duration: 4000,
                isClosable: true,
              });
              return;
            }
            await fetch(
              `${BACKEND_API_URL}/v1/artist/${toFollow}/${followedBy}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                // body: JSON.stringify({ message: "hello" }),
              }
            ).then((response) => {
              toast({
                title: "Following",
                description: `${toFollow}`,
                status: "success",
                duration: 4000,
                isClosable: true,
              });
            });
          }}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
