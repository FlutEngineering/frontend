import { useMutation } from "react-query";
import { Button, VStack, Stack } from "@chakra-ui/react";
import Files from "react-files";

import { useAudioStore } from "store";
import AudioPlayer from "./AudioPlayer";
import styles from "@/styles/AudioUploader.module.css";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

interface UploadedAudio {
  [k: string]: string;
}

interface AudioListProps {
  files: File[];
  uploaded: UploadedAudio;
}

const AudioList: React.FC<AudioListProps> = ({ files, uploaded }) => {
  return (
    <VStack maxWidth="100%">
      {files.map((file) => {
        const audio = {
          name: file.name,
          url: URL.createObjectURL(file),
        };
        const cid = uploaded[file.name];
        return <AudioPlayer audio={audio} cid={cid} key={file.name} />;
      })}
    </VStack>
  );
};

export default function AudioUploader() {
  const { files, uploaded, add, upload, clear } = useAudioStore();

  console.log("uploaded =>", uploaded);

  const uploadAudioMutation = useMutation(async (file: File) => {
    await upload(file);
  });

  const handleFilesUpload = () => {
    console.log("handleUpload");
    files.forEach((file) => uploadAudioMutation.mutate(file));
  };

  return (
    <VStack>
      <Files
        className={styles["dropzone-list"]}
        dragActiveClassName={styles["dropzone-active"]}
        style={{ height: "100px", width: "100%" }}
        onChange={add}
        multiple
        maxFiles={5}
        maxFileSize={MAX_FILE_SIZE}
        minFileSize={1}
        clickable
      >
        Drop file here or click to upload
      </Files>
      {files.length > 0 && <AudioList files={files} uploaded={uploaded} />}
      <Stack pt={1} spacing={2} direction="row" align="center">
        <Button
          colorScheme="blue"
          onClick={() => handleFilesUpload()}
          isLoading={uploadAudioMutation.isLoading}
          loadingText="Uploading..."
          disabled={!files.length || uploadAudioMutation.isLoading}
        >
          Upload
        </Button>
        <Button
          colorScheme="gray"
          onClick={clear}
          disabled={!files.length || uploadAudioMutation.isLoading}
        >
          Clear
        </Button>
      </Stack>
      {/* <FormControl> */}
      {/*   <FormLabel for="inputTag" cursor="pointer"></FormLabel> */}
      {/*   <Input */}
      {/*     id="inputTag" */}
      {/*     display="none" */}
      {/*     type="file" */}
      {/*     accept="audio/*" */}
      {/*     ref={fileInputRef} */}
      {/*     onChange={handleFileChange} */}
      {/*   /> */}

      {/*   {uploadAudioMutation.isLoading && ( */}
      {/*     <Text mt={2}>Uploading audio file...</Text> */}
      {/*   )} */}
      {/*   {uploadAudioMutation.isError && ( */}
      {/*     <Text color="red.500" mt={2}> */}
      {/*       Error uploading audio file. */}
      {/*     </Text> */}
      {/*   )} */}
      {/*   {uploadAudioMutation.isSuccess && ( */}
      {/*     <Text color="green.500" mt={2}> */}
      {/*       Audio file uploaded successfully! */}
      {/*     </Text> */}
      {/*   )} */}
      {/*   <Button */}
      {/*     mt={4} */}
      {/*     colorScheme="blue" */}
      {/*     isLoading={uploadAudioMutation.isLoading} */}
      {/*     loadingText="Uploading..." */}
      {/*     disabled={uploadAudioMutation.isLoading} */}
      {/*   > */}
      {/*     Upload */}
      {/*   </Button> */}
      {/* </FormControl> */}
    </VStack>
  );
}
