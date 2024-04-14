import { useState } from "react";
import { Button, VStack, Stack, Heading, HStack, Grid, GridItem, Text, Flex, Link, Box} from "@chakra-ui/react";
import AudioDropzone from "./components/AudioDropzone";
import AudioFileList from "./components/AudioFileList";
import { useAccount, useEnsName } from "wagmi";
import { Navigate } from "react-router-dom";

function Upload(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: ensName } = useEnsName({
    address: address,
  });

  const clear = () => setFiles([]);

  return address ? (
    <VStack
      width="100%"
      marginTop={{ base: 4, lg: 0 }}
      paddingBottom="2"
      // overflowY="scroll"
    >
      <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(5,1fr)' marginBottom='5vh'>
        <GridItem rowSpan={2} colSpan={5}><Text fontSize='6xl' >Upload Requirements</Text></GridItem>
        <GridItem rowSpan={1} colSpan={5}><Text fontSize='xl'>Content MUST be:</Text></GridItem>
        <GridItem rowSpan={1} colSpan={5}>
          <Flex direction='row' justifyContent='space-between'>
          <Text>1. Original</Text>
          <Text>2. Yours to Distribute</Text>
          <Text>3. High Quality</Text>
          </Flex>
          <Text >*Content that does not meet this requirements is subject to removal</Text>
        </GridItem>
      </Grid>

      {files.length === 0 ? (
        <AudioDropzone onSelect={(files) => setFiles(files)} />
      ) : (
        <Stack width="100%" alignItems="center">
          <HStack
            width="100%"
            justifyContent="flex-start"
            alignItems="center"
            paddingTop="0"
            paddingBottom="3"
          >
            <Heading size="md">Uploading {files.length} files</Heading>
            <Button
              size="sm"
              colorScheme="gray"
              variant="outline"
              onClick={clear}
            >
              Clear
            </Button>
          </HStack>
          <AudioFileList files={files} address={address} ensName={ensName} />
        </Stack>
      )}
      <Box 
      paddingY='5vh'
      alignItems='center'
      >
        <Text fontSize='3xl'>
        Your content is uploaded to decentralized storage.
        </Text>
        <Text >
          It's called IPFS, and our provider is <Link href="https://www.4everland.org" isExternal color='pink'>4Everland</Link>.  You can learn more about IPFS <Link href="https://docs.ipfs.tech/concepts/what-is-ipfs/#defining-ipfs" isExternal color='pink'>Here</Link>
        </Text>
      </Box>
    </VStack>
  ) : (
    <Navigate to="/browse" />
  );
}

export default Upload;
