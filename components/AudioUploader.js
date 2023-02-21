import { useMutation } from "react-query";
import { useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const FormikExample = () => {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: "Sasuke" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default function AudioUploader() {
  const fileInputRef = useRef(null);

  const uploadAudioMutation = useMutation(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://filebase.com/api/upload", {
      method: "POST",
      headers: {
        Authorization: process.env.ALCHEMY_API_KEY,
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
    <Box>
      <FormikExample />
      <FormControl>
        <FormLabel for="inputTag" cursor="pointer"></FormLabel>
        <Input
          id="inputTag"
          display="none"
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
    </Box>
  );
}
