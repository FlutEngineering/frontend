export const pinatakey = process.env.PINATA_API_KEY;
export const pinatasecret = process.env.PINATA_API_SECRET;
export const pinatajwt = process.env.PINATA_JWT;
// export const ipfsgateway = "ENTER_PINATA_GATEWAY_DOMAIN"; // Do NOT ADD .mypinata.cloud... just your gateway name.

export const readHeader = {
  "Content-Type": "application/json",
};

export const getHeader = {
  headers: {
    pinata_api_key: pinatakey,
    pinata_secret_api_key: pinatasecret,
  },
};

export const sendJsonHeader = {
  headers: {
    "Content-Type": "application/json",
    pinata_api_key: pinatakey,
    pinata_secret_api_key: pinatasecret,
  },
};
