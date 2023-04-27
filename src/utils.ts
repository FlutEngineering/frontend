import { IPFS_GATEWAY_URL } from "./config";
import { Address } from "wagmi";

interface ArtistName {
  address: Address;
  ensName: string | null | undefined;
}
export const formatArtistName = (artist: ArtistName) =>
  artist.ensName ||
  `${artist.address.slice(0, 5)}...${artist.address.slice(-4)}`;

export const ipfsCidToUrl = (cid: string) => `${IPFS_GATEWAY_URL}/${cid}`;
