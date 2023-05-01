import { useCallback, useMemo, useState } from "react";
import { IPFS_FALLBACK_GATEWAY_URLS } from "~/config";
import { ipfsCidToUrl } from "~/utils";

const useIpfsAsset = (cid: string) => {
  const [gatewayIndex, setGatewayIndex] = useState(0);
  const url = useMemo(
    () =>
      ipfsCidToUrl(cid, { gateway: IPFS_FALLBACK_GATEWAY_URLS[gatewayIndex] }),
    [cid, gatewayIndex]
  );

  const rotateGateway = useCallback(
    () =>
      setGatewayIndex(gatewayIndex + (1 % IPFS_FALLBACK_GATEWAY_URLS.length)),
    [gatewayIndex, setGatewayIndex]
  );

  return { url, rotateGateway };
};

export default useIpfsAsset;
