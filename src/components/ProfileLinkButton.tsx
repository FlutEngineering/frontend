import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";
import { formatArtistName } from "~/utils";
import { Address, useEnsName } from "wagmi";

interface ProfileLinkButtonProps {
  address: Address;
}
const ProfileLinkButton: React.FC<ProfileLinkButtonProps> = ({ address }) => {
  const { data: ensName } = useEnsName({ address });

  return (
    <Box>
      <Button as={RouterLink} to={`/${address}`} height={5} variant="outline">
        {formatArtistName({ address, ensName })}
      </Button>
    </Box>
  );
};
export default ProfileLinkButton;
