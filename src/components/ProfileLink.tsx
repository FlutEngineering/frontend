import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import { Address, useEnsName } from "wagmi";

import Identicon from "./Identicon";

interface ProfileLinkProps {
  address: Address;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ address }) => {
  const { data: ensName } = useEnsName({ address });
  const artist = useMemo(() => ensName || address, [address, ensName]);
  return (
    <HStack
      as={RouterLink}
      to={`/${address}`}
      color="gray.500"
      _hover={{ textDecoration: "none", color: "gray.400" }}
    >
      <Identicon address={address} size={16} />
      <Box fontSize="sm" paddingLeft={0} paddingTop="3px">
        {artist}
      </Box>
    </HStack>
  );
};

export default ProfileLink;
