import { Address } from "wagmi";

export interface Track {
  audio: string;
  image: string;
  title: string;
  slug: string;
  artistAddress: Address;
  tags: string[];
}

export interface Artist {
  address: Address;
  ens: string | null | undefined;
}

export interface Tag {
  name: string;
  trackCount: number;
}
