// import { ethers } from "ethers";
// import { useEffect, useState } from "react";
// import { useAccount, useProvider } from "wagmi";

// const useENS = () => {
//   const [ensName, setENSName] = useState("");
//   const [ensAvatar, setENSAvatar] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { address } = useAccount();
//   const provider = useProvider();

//   useEffect(() => {
//     const resolveENS = async () => {
//       setLoading(true);
//       if (address) {
//         try {
//           let ensName = await provider.lookupAddress(address);
//           const resolver = ensName ? await provider.getResolver(ensName) : null;
//           let avatar = resolver ? await resolver.getAvatar() : null;
//           setENSName(ensName);
//           setENSAvatar(avatar);
//           console.log("🦙", ensName, ensName);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     resolveENS();
//   }, [address]);

//   return { ensName, ensAvatar, loading };
// };

// export default useENS;
