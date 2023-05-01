// TODO: env validation
export const BACKEND_API_URL: string =
  import.meta.env.ENV_BACKEND_API_URL || "";
export const ASSETS_URL: string = import.meta.env.ENV_ASSETS_URL || "";
export const IPFS_GATEWAY_URL: string =
  import.meta.env.ENV_IPFS_GATEWAY_URL || "";
export const IPFS_FALLBACK_GATEWAY_URLS = [
  IPFS_GATEWAY_URL,
  "https://ipfs.io/ipfs",
  "https://infura-ipfs.io/ipfs",
  "https://ipfs.4everland.link/ipfs",
];
export const IPFS_ASSETS_CID: string =
  import.meta.env.ENV_IPFS_ASSETS_CID || "";
export const ALCHEMY_API_KEY: string =
  import.meta.env.ENV_ALCHEMY_API_KEY || "";
export const INFURA_API_KEY: string = import.meta.env.ENV_INFURA_API_KEY || "";
