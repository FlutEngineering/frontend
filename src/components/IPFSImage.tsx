import { useCallback } from "react";
import { Image, ImageProps } from "@chakra-ui/react";
import useIpfsAsset from "~/hooks/useIpfsAsset";

interface IPFSImageProps {
  cid: string;
}

const IPFSImage: React.FC<IPFSImageProps & ImageProps> = ({ cid, ...rest }) => {
  const { url, rotateGateway } = useIpfsAsset(cid);

  const renderImage = useCallback(
    () => (
      <Image
        src={url}
        loading="lazy"
        onError={() => rotateGateway()}
        {...rest}
      />
    ),
    [url, rest]
  );

  return renderImage();
};

export default IPFSImage;
