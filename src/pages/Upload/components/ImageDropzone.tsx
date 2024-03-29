import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  // Slider,
  // SliderTrack,
  // SliderFilledTrack,
  // SliderThumb,
  IconButton,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { FaPen } from "react-icons/fa";
import { css } from "@emotion/react";

interface DropzoneProps {
  image?: File;
  onSelect: (file: File) => void;
  isInvalid: boolean;
  onImageReady: () => void;
  editorRef: React.Ref<AvatarEditor>;
}

const FILETYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3Mb

const ImageDropzone: React.FC<DropzoneProps> = ({
  image,
  onSelect,
  isInvalid,
  onImageReady,
  editorRef,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    open,
    fileRejections,
  } = useDropzone({
    accept: FILETYPES,
    onDropAccepted: (files) => onSelect(files[0]),
    // onFileDialogOpen: () => onSelect([]),
    multiple: false,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    noKeyboard: true,
    noClick: true,
  });

  const toast = useToast();

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

  const activeColor = useMemo(() => {
    if (isDragAccept) {
      return "green.500";
    }
    if (isDragReject) {
      return "red.500";
    }
    if (isInvalid) {
      return "red.500";
    }
    return "currentColor";
  }, [isInvalid, isDragAccept, isDragReject]);

  return (
    <Box width="250px" minWidth="250px" height="250px" overflow="hidden">
      <Flex
        {...getRootProps()}
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="250px"
        height="250px"
        borderWidth="2px"
        borderRadius="md"
        borderStyle={image && !isDragAccept ? "solid" : "dashed"}
        borderColor={activeColor}
        backgroundColor="transparent"
        color="gray.100"
        outline="none"
        transition="border 0.15s ease-in-out"
        cursor="pointer"
        _hover={{
          borderColor: image ? "currentColor" : "purple.500",
        }}
        _focus={{ borderColor: "purple.500" }}
        background="none"
        onClick={() => !image && open()}
        overflow="hidden"
      >
        <input {...getInputProps()} />
        {!image && (
          <Text
            fontSize="lg"
            color={activeColor}
            transition="color 0.15s ease-in-out"
          >
            Drag 'n' drop an image
          </Text>
        )}
        {image && (
          <Box
            position="relative"
            width="250px"
            height="250px"
            css={css`
              &:hover > #select-image {
                opacity: 0.7;
                visibility: visible;
              }
            `}
          >
            <AvatarEditor
              style={{
                width: "250px",
                height: "250px",
                maxWidth: "250px",
                maxHeight: "250px",
              }}
              width={250}
              height={250}
              image={image}
              border={0}
              ref={editorRef}
              onImageReady={onImageReady}
            />
            <IconButton
              icon={<FaPen />}
              position="absolute"
              top="10px"
              right="10px"
              opacity={0}
              visibility="hidden"
              hidden={isDragAccept}
              id="select-image"
              aria-label="select image"
              onClick={() => open()}
            />
            {/* <Slider */}
            {/*   defaultValue={30} */}
            {/*   orientation="vertical" */}
            {/*   position="absolute" */}
            {/*   height="200px" */}
            {/*   top="20px" */}
            {/*   left="10px" */}
            {/*   // minHeight="82" */}
            {/*   aria-label="slider-ex-3" */}
            {/* > */}
            {/*   <SliderTrack> */}
            {/*     <SliderFilledTrack /> */}
            {/*   </SliderTrack> */}
            {/*   <SliderThumb /> */}
            {/* </Slider> */}
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ImageDropzone;
