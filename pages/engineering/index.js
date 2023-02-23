import Head from "next/head";

import { Inter } from "@next/font/google";
import { CodeBlock, atomOneDark } from "react-code-blocks";

import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Image,
} from "@chakra-ui/react";

import Header from "components/Header";
import Link from "next/link";

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
        margin="2vw"
      >
        <Header />
        <Text
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="5xl"
          paddingY="10vh"
          textAlign="center"
        >
          {`How We're Building It`}
        </Text>
        <Text fontSize="xl" marginX={{ base: "0", medium: "15vw" }}>
          {`We're big fans of Music here at FLUT. Most of us are musicians
          ourselves. We're building the platform that we want to use. Our
          techstack includes a hybrid of web2 and web3 technologies such as:`}
        </Text>
        <UnorderedList paddingY="2vh" fontSize="xl">
          <ListItem>
            <Link href="https://nextjs.org/" isExternal>
              <Text color="blue.300">NextJs</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://expressjs.com/" isExternal>
              <Text color="blue.300">ExpressJs</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.postgresql.org/" isExternal>
              <Text color="blue.300">Postgres</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://soliditylang.org/" isExternal>
              <Text color="blue.300">Solidity</Text>
            </Link>
          </ListItem>
        </UnorderedList>
        <Text paddingY="2vh" fontSize="xl">
          {`We plan to use Ethereum mainnet to handle issues such as content
          ownership and revenue mechanics. We plan to use NodeJS and traditional
          web2 mechanics to keep track of relationships between user such as who
          follows who and how many likes you have. This is because only the most
          important information should be stored on-chain. For example, you
          don't want to sign a transaction every time you want to play a song.
          However, you want to get paid for your content, and we need a way to keep
          track of who is owed what. We can keep track of this information with
          our web2 back end, and then create key moments when users will be
          required to settle the balance. For example, if you've been listening
          to a lot of music, you might need to sign a transaction to pay your total balance which will then be distributed fairly amongst the artists.  If too large of a balance is owed, we can disable listening for that wallet.`}
        </Text>
        <Image paddingY="2vh" src="/skywhales.png" />
        <Text paddingY="2vh" fontSize="xl">
          At the moment, your wallet is your user profile. You are able to
          upload audio to our decentralized storage. We use (InterPlanetary File
          System)
        </Text>
        <UnorderedList paddingY="2vh" fontSize="xl">
          <ListItem>
            <Link href="https://ipfs.tech/" isExternal>
              <Text color="blue.300">IPFS</Text>
            </Link>
          </ListItem>
        </UnorderedList>
        <Text paddingY="2vh" fontSize="xl">
          IPFS is a decentralized file storage system that allows files to be
          stored and accessed using content-based addressing, which means that
          files are retrieved based on their unique content hash, rather than a
          specific location on a centralized server. This makes IPFS a good fit
          for a decentralized music sharing platform, as it allows for the
          storage and retrieval of large audio files in a distributed,
          fault-tolerant manner. When you add a file to the IPFS network, we
          generate a content-based hash for the file. This hash will then be
          stored on the blockchain, along with metadata such as the song title,
          artist name, album name, and so on. The metadata will be stored using
          a smart contract, which will allow for the creation of a decentralized
          music database that could be queried by anyone on the network. When a
          user wants to play a song, they will query the blockchain for the IPFS
          hash of the corresponding audio file. They will then retrieve the file
          from the IPFS network and play it will start to play on our site. 💪
        </Text>
        <Text paddingY="2vh" fontSize="xl">
          To ensure that artists are properly compensated for their work, we
          will use $FLUT to facilitate balances for each play or download of a
          song. This will allow for a fair and transparent system of royalty
          payments that will be tracked and enforced by the blockchain. We want
          to provide a secure, transparent, and efficient way for artists to
          share their music and for music lovers to discover new and independent
          artists, all while ensuring that artists are compensated fairly for
          their work.
        </Text>
        <Image paddingY="2vh" src="/musicMachine.png" />
      </Box>
    </Box>
  );
}
