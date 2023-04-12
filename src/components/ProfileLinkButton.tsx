import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";
import { formatArtistName } from "~/utils";
import { Address, useEnsName } from "wagmi";

interface ProfileLinkButtonProps {
  address: Address;
}
const ProfileLinkButton: React.FC<ProfileLinkButtonProps> = ({ address }) => {
  const { data: ensName } = useEnsName({ address });

  return (
    <Text color="gray.500" fontSize="sm" margin="0">
      <Button
        as={RouterLink}
        to={`/${address}`}
        height={5}
        variant="outline"
        colorScheme="blue"
      >
        {formatArtistName({ address, ensName })}
      </Button>
    </Text>
  );
};
export default ProfileLinkButton;
