import { useState } from "react";
import { Button, VStack, Stack, Heading, HStack } from "@chakra-ui/react";
import AudioDropzone from "./components/AudioDropzone";
import AudioFileList from "./components/AudioFileList";
import { useAccount, useEnsName } from "wagmi";
import { Navigate } from "react-router-dom";

function Upload(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: ens } = useEnsName({
    address: address,
  });

  const clear = () => setFiles([]);

  return address ? (
    <VStack width="100%">
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
          <AudioFileList files={files} artist={{ address, ens }} />
        </Stack>
      )}
    </VStack>
  ) : (
    <Navigate to="/app/" />
  );
}

export default Upload;
