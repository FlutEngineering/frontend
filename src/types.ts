export interface Track {
  audio: string;
  image: string;
  title: string;
  artistAddress: `0x${string}`;
  tags: string[];
}

export interface Artist {
  address: `0x${string}`;
  ens: string | null | undefined;
}

export interface Tag {
  name: string;
  trackCount: number;
}
