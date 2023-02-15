import Head from "next/head";

import { Inter } from "@next/font/google";
import { CodeBlock, atomOneDark } from "react-code-blocks";

import { Box, Text, Heading } from "@chakra-ui/react";

import Header from "components/Header";

const inter = Inter({ subsets: ["latin"] });
const IPFSCode = `pragma solidity ^0.8.0;

contract MusicSharingPlatform {
    
    struct Song {
        string title;
        string artist;
        string album;
        string ipfsHash;
    }

    mapping(uint => Song) public songs;
    uint public songCount;

    event SongUploaded(
        string title,
        string artist,
        string album,
        string ipfsHash
    );

    function uploadSong(string memory _title, string memory _artist, string memory _album, string memory _ipfsHash) public {
        songCount++;
        songs[songCount] = Song(_title, _artist, _album, _ipfsHash);
        emit SongUploaded(_title, _artist, _album, _ipfsHash);
    }

    function getSong(uint _songId) public view returns (string memory title, string memory artist, string memory album, string memory ipfsHash) {
        return (songs[_songId].title, songs[_songId].artist, songs[_songId].album, songs[_songId].ipfsHash);
    }
}
`;
const PaymentCode = `pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract MusicSharingPlatform {
    
    struct Song {
        string title;
        string artist;
        string album;
        string ipfsHash;
        uint256 price;
        address payable artistAddress;
    }

    mapping(uint => Song) public songs;
    uint public songCount;

    event SongUploaded(
        string title,
        string artist,
        string album,
        string ipfsHash,
        uint256 price,
        address payable artistAddress
    );

    event SongPurchased(
        uint songId,
        address buyer,
        uint256 price
    );

    IERC20 public token;
    address public tokenAddress;
    uint256 public exchangeRate;

    constructor(address _tokenAddress, uint256 _exchangeRate) {
        token = IERC20(_tokenAddress);
        tokenAddress = _tokenAddress;
        exchangeRate = _exchangeRate;
    }

    function uploadSong(string memory _title, string memory _artist, string memory _album, string memory _ipfsHash, uint256 _price) public {
        songCount++;
        songs[songCount] = Song(_title, _artist, _album, _ipfsHash, _price, payable(msg.sender));
        emit SongUploaded(_title, _artist, _album, _ipfsHash, _price, payable(msg.sender));
    }

    function purchaseSong(uint _songId) public {
        Song storage song = songs[_songId];
        require(song.price > 0, "Song price must be greater than zero.");
        require(token.allowance(msg.sender, address(this)) >= song.price * exchangeRate, "Insufficient token allowance.");
        require(token.transferFrom(msg.sender, song.artistAddress, song.price * exchangeRate), "Token transfer failed.");
        emit SongPurchased(_songId, msg.sender, song.price);
    }

    function setExchangeRate(uint256 _exchangeRate) public {
        require(msg.sender == tokenAddress, "Only the token contract can set the exchange rate.");
        exchangeRate = _exchangeRate;
    }
}
`;
export default function Home() {
  return (
    <Box>
      <Head>
        <title>The Decentralized Music Platform</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flut.ico" />
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        padding="6rem"
        minHeight="100vh"
      >
        <Header />

        <Text
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="5xl"
          paddingY="15vh"
        >
          How to Build it
        </Text>

        <Text
          fontSize="large"
          lineHeight="260%"
          marginX="15vw"
          paddingBottom="15vh"
          textAlign="center"
        >
          Disclaimer: No code listed on this page is meant to be compiled or
          deployed. The following examples are to demonstrate architecture only.
        </Text>
        <Text
          fontSize="large"
          lineHeight="260%"
          marginX="15vw"
          paddingBottom="15vh"
        >
          One approach could be to store the audio files as IPFS (InterPlanetary
          File System) hashes on the blockchain. IPFS is a decentralized file
          storage system that allows files to be stored and accessed using
          content-based addressing, which means that files are retrieved based
          on their unique content hash, rather than a specific location on a
          centralized server. This makes IPFS a good fit for a decentralized
          music sharing platform, as it allows for the storage and retrieval of
          large audio files in a distributed, fault-tolerant manner. To upload
          an audio file to the platform, a user would first convert the audio
          file to a format compatible with IPFS, such as FLAC or WAV. They would
          then add the file to the IPFS network, which would generate a
          content-based hash for the file. This hash could then be stored on the
          blockchain, along with metadata such as the song title, artist name,
          album name, and so on. The metadata could be stored using a smart
          contract, which would allow for the creation of a decentralized music
          database that could be queried by anyone on the network. When a user
          wants to play a song, they could query the blockchain for the IPFS
          hash of the corresponding audio file. They could then retrieve the
          file from the IPFS network and play it using a compatible media
          player. To ensure that artists are properly compensated for their
          work, the platform could use a blockchain-based payment system, such
          as a cryptocurrency or a stablecoin, to facilitate micropayments for
          each play or download of a song. This would allow for a fair and
          transparent system of royalty payments that would be tracked and
          enforced by the blockchain. Overall, by leveraging IPFS and blockchain
          technology, a decentralized music sharing platform could provide a
          secure, transparent, and efficient way for artists to share their
          music and for music lovers to discover new and independent artists,
          all while ensuring that artists are compensated fairly for their work.
        </Text>
        <Text
          fontSize="large"
          lineHeight="260%"
          marginX="15vw"
          paddingBottom="15vh"
        >
          For example..
        </Text>
        <CodeBlock
          text={PaymentCode}
          language={"javascript"}
          showLineNumbers={false}
          theme={atomOneDark}
          borderRadius="15"
        />

        <Text fontSize="large" lineHeight="260%" paddingY="15vh" marginX="15vw">
          In this contract, we define a struct Song that contains the metadata
          for each song, including its title, artist, album, and IPFS hash. We
          also define a mapping songs that maps each song ID to its
          corresponding Song struct, and a counter songCount that keeps track of
          the number of songs that have been uploaded to the platform. The
          uploadSong function allows a user to upload a new song by providing
          its metadata and IPFS hash as arguments. This function increments the
          songCount and adds a new entry to the songs mapping with the provided
          metadata and hash. The function also emits a SongUploaded event with
          the uploaded song's metadata and hash. The getSong function allows a
          user to retrieve the metadata and IPFS hash for a specific song, given
          its ID. This function returns a tuple with the song's title, artist,
          album, and IPFS hash. This contract provides a basic implementation
          for uploading and retrieving songs on a blockchain-based music sharing
          platform, but it would need to be extended to include additional
          functionality such as payment processing, user authentication, and
          content moderation, among many other features.
        </Text>
      </Box>
    </Box>
  );
}
