import React from "react";
import { Text, Button } from "@chakra-ui/react";
import { formatArtistName, ipfsCidToUrl } from "~/utils";
import { useNavigate } from "react-router-dom";
import { useEnsName } from "wagmi";

type ProfileLinkButtonProps = {
  address: string;
};
const ProfileLinkButton: React.FC<ProfileLinkButtonProps> = ({ address }) => {
  const navigate = useNavigate();
  const { data: ens } = useEnsName({ address });
  return (
    <>
      <Text color="gray.500" fontSize="sm" margin="0">
        <Button
          height={5}
          variant="outline"
          colorScheme="blue"
          onClick={() => {
            navigate({
              pathname: `/app/profile/${address}`,
            });
          }}
        >
          {formatArtistName({ address, ens })}
        </Button>
      </Text>
    </>
  );
};
export default ProfileLinkButton;
