import { Flex, Text, useToast } from "@chakra-ui/react";
import { useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onSelect: (files: File[]) => void;
}

const FILETYPES = {
  "audio/aac": [".aac"],
  "audio/flac": [".flac"],
  "audio/mpeg": [".mp3"],
  "audio/ogg": [".ogg", ".oga"],
  "audio/opus": [".opus"],
  "audio/wav": [".wav"],
  "audio/wave": [".wav"],
  "audio/webm": [".weba"],
};

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20Mb

const AudioDropzone: React.FC<DropzoneProps> = ({ onSelect }) => {
  const toast = useToast();

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: FILETYPES,
    onDropAccepted: (files) => onSelect(files),
    multiple: true,
    maxFiles: 5,
    maxSize: MAX_FILE_SIZE,
  });

  useEffect(() => {
    console.log(fileRejections);
    if (fileRejections?.length > 0) {
      fileRejections.slice(0, 2).map(({ file, errors }) => {
        errors.slice(0, 1).map((error) => {
          toast({
            title: error.code,
            description: error.message,
            status: "warning",
            duration: 4000,
            isClosable: true,
          });
        });
      });
    }
  }, [fileRejections]);

  const borderColor = useMemo(() => {
    if (isDragAccept) {
      return "blue.300";
    }
    if (isDragReject) {
      return "red.300";
    }
    return "#eeeeee";
  }, [isDragAccept, isDragReject]);

  return (
    <Flex
      {...getRootProps()}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="248px"
      padding="20px"
      borderWidth="2px"
      borderRadius="2px"
      borderStyle="dashed"
      borderColor={borderColor}
      backgroundColor="#fafafa"
      color="#bdbdbd"
      outline="none"
      transition="border 0.15s ease-in-out"
      cursor="pointer"
      _hover={{ borderColor: "blue.300" }}
      _focus={{ borderColor: "blue.300" }}
    >
      <input {...getInputProps()} />
      <Text fontSize="lg">Drag 'n' drop files here, or click to select</Text>
    </Flex>
  );
};

export default AudioDropzone;
