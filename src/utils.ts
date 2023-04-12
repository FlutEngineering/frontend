import { IPFS_GATEWAY_URL } from "./config";
import { Artist } from "./types";

export const formatArtistName = ({
  address,
  ensName,
}: Pick<Artist, "address" | "ensName">) =>
  ensName || `${address.slice(0, 5)}...${address.slice(-4)}`;

export const ipfsCidToUrl = (cid: string) => `${IPFS_GATEWAY_URL}/${cid}`;
