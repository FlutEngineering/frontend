import { useMutation } from "react-query";
import { Button, VStack, Stack, Input, HStack } from "@chakra-ui/react";
import Files from "react-files";
import { useState } from "react";
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
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);
  return (
    <VStack>
      {files.map((file, index) => {
        const audio = {
          name: file.name,
          url: URL.createObjectURL(file),
        };
        const cid = uploaded[file.name];
        return (
          <HStack key={index}>
            <AudioPlayer audio={audio} cid={cid} key={file.name} />
            {/* <Input
              variant="filled"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <Input
              variant="filled"
              placeholder="Tags"
              value={tags}
              onChange={handleTagsChange}
            /> */}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default function AudioUploader() {
  const { files, uploaded, add, upload, clear } = useAudioStore();

  const uploadAudioMutation = useMutation(async (file: File) => {
    await upload(file);
  });

  const handleFilesUpload = () => {
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
        maxFiles={1}
        maxFileSize={MAX_FILE_SIZE}
        minFileSize={1}
        clickable
      >
        Drop Files or Click Here
      </Files>
      {files.length > 0 && <AudioList files={files} uploaded={uploaded} />}
      <Stack pt={1} spacing={2} direction="row" align="center">
        <Button
          colorScheme="gray"
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
    </VStack>
  );
}
