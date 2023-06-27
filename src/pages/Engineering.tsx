import {
  Box,
  Text,
  ListItem,
  UnorderedList,
  Image,
  Link,
} from "@chakra-ui/react";
import { ASSETS_URL } from "~/config";

function Engineering(): JSX.Element {
  return (
    <Box>
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
      <Text fontSize="xl" marginX={{ base: "0", medium: "15vw" }} textIndent="2rem">
        {`We're big fans of Music here at FLUT. Most of us are musicians
          ourselves. We're building the platform that we want to use. Our
          techstack includes a hybrid of web2 and web3 technologies such as:`}
      </Text>
      <UnorderedList paddingY="2vh" fontSize="xl">
        <ListItem>
          <Link href="https://reactjs.org/" isExternal color="blue.300">
            React
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://expressjs.com/" isExternal color="blue.300">
            Express
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.postgresql.org/" isExternal color="blue.300">
            PostgreSQL
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://soliditylang.org/" isExternal color="blue.300">
            Solidity
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
      <Image paddingY="2vh" src={`${ASSETS_URL}/skywhales.jpg`} />
      <Text paddingY="2vh" fontSize="xl">
        At the moment, your wallet is your user profile. You are able to upload
        audio to our decentralized storage. We use (InterPlanetary File System)
      </Text>
      <UnorderedList paddingY="2vh" fontSize="xl">
        <ListItem>
          <Link href="https://ipfs.tech/" isExternal color="blue.300">
            IPFS
          </Link>
        </ListItem>
      </UnorderedList>
      <Text paddingY="2vh" fontSize="xl">
        IPFS is a decentralized file storage system that allows files to be
        stored and accessed using content-based addressing, which means that
        files are retrieved based on their unique content hash, rather than a
        specific location on a centralized server. This makes IPFS a good fit
        for a decentralized music sharing platform, as it allows for the storage
        and retrieval of large audio files in a distributed, fault-tolerant
        manner. When you add a file to the IPFS network, we generate a
        content-based hash for the file. This hash will then be stored on the
        blockchain, along with metadata such as the song title, artist name,
        album name, and so on. The metadata will be stored using a smart
        contract, which will allow for the creation of a decentralized music
        database that could be queried by anyone on the network. When a user
        wants to play a song, they will query the blockchain for the IPFS hash
        of the corresponding audio file. They will then retrieve the file from
        the IPFS network and play it will start to play on our site. 💪
      </Text>
      <Text paddingY="2vh" fontSize="xl">
        To ensure that artists are properly compensated for their work, we will
        use $FLUT to facilitate balances for each play or download of a song.
        This will allow for a fair and transparent system of royalty payments
        that will be tracked and enforced by the blockchain. We want to provide
        a secure, transparent, and efficient way for artists to share their
        music and for music lovers to discover new and independent artists, all
        while ensuring that artists are compensated fairly for their work.
      </Text>
      <Image paddingY="2vh" src={`${ASSETS_URL}/musicMachine.jpg`} />
    </Box>
  );
}

export default Engineering;
