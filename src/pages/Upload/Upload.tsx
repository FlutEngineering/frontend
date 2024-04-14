import { useState } from "react";
import { Button, VStack, Stack, Heading, HStack, Grid, GridItem, Text } from "@chakra-ui/react";
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
      overflowY="scroll"
    >
      <Grid templateRows='repeat(2,1fr)' templateColumns='repeat(5,1fr)' backgroundColor='pink'>

        <GridItem rowSpan={1} colSpan={1}><Text>By uploading here you certify that your upload is original</Text></GridItem>
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
    </VStack>
  ) : (
    <Navigate to="/browse" />
  );
}

export default Upload;
