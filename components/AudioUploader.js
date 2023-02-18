import { useMutation } from "react-query";
import { useRef } from "react";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function AudioUploader() {
  const fileInputRef = useRef(null);

  const uploadAudioMutation = useMutation(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://filebase.com/api/upload", {
      method: "POST",
      headers: {
        Authorization: "in8--Gsskc7dkKhKtTnthlZ7dLvZIdCs",
      },
      body: formData,
    });
    return response.json();
  });

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    uploadAudioMutation.mutate(file);
  };

  return (
    <FormControl>
      <FormLabel htmlFor="audio-file">Select an audio file</FormLabel>
      <Input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {uploadAudioMutation.isLoading && (
        <Text mt={2}>Uploading audio file...</Text>
      )}
      {uploadAudioMutation.isError && (
        <Text color="red.500" mt={2}>
          Error uploading audio file.
        </Text>
      )}
      {uploadAudioMutation.isSuccess && (
        <Text color="green.500" mt={2}>
          Audio file uploaded successfully!
        </Text>
      )}
      <Button
        mt={4}
        colorScheme="blue"
        isLoading={uploadAudioMutation.isLoading}
        loadingText="Uploading..."
        disabled={uploadAudioMutation.isLoading}
      >
        Upload
      </Button>
    </FormControl>
  );
}
