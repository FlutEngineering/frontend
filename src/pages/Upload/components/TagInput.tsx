import React, { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import TagBadge from "~/components/TagBadge";

type TagInputProps = {
  label: React.ReactNode;
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
  isInvalid: boolean;
} & InputProps;

const TagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  addTag,
  removeTag,
  maxTags,
  isInvalid,
  ...rest
}) => {
  const [text, setText] = useState("");
  const [inputBlurred, setInputBlurred] = useState(false);

  const isInputError = isInvalid || (inputBlurred && tags.length < 3);

  return (
    <FormControl isInvalid={isInputError}>
      {label}
      {isInputError && (
        <FormErrorMessage
          display="inline-block"
          margin="0"
          marginInlineStart="-2"
          verticalAlign="top"
          color="red.500"
        >
          Add at least 3 tags
        </FormErrorMessage>
      )}
      <InputGroup
        position="relative"
        css={css`
          &:hover > label {
            border-color: var(--chakra-colors-whiteAlpha-400);
          }
          input:focus ~ label {
            border-color: var(--chakra-colors-purple-500);
          }
          input[aria-invalid="true"] ~ label,
          input[data-invalid] ~ label {
            border-color: var(--chakra-colors-red-500);
          }
        `}
      >
        {!!tags.length && (
          <HStack paddingLeft="4">
            {tags.map((tag) => (
              <TagBadge tag={tag} onClick={() => removeTag(tag)} key={tag} />
            ))}
          </HStack>
        )}
        <Input
          {...rest}
          paddingLeft={!!tags.length ? "2" : "4"}
          border="none"
          outline="none"
          boxShadow="none"
          value={text}
          placeholder={tags.length < maxTags ? "Add some tags" : ""}
          _focus={{ boxShadow: "none" }}
          _invalid={{ boxShadow: "none" }}
          onChange={(event) => setText(event.target.value.toLowerCase())}
          onKeyDown={(event) => {
            if (text === "" && event.key === "Backspace") {
              event.preventDefault();
              const last = tags.at(-1);
              last && removeTag(last);
            } else if (
              text !== "" &&
              (event.key === " " || event.key === "Enter")
            ) {
              event.preventDefault();
              const tag = text.trim().split(" ")[0];
              addTag(tag);
              setText("");
            } else if (event.key === " ") {
              event.preventDefault();
            }
          }}
          onBlur={() => setInputBlurred(true)}
          onFocus={() => setInputBlurred(false)}
        />
        <FormLabel
          position="absolute"
          width="100%"
          height="8"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="inherit"
          borderRadius="sm"
          outline="2px solid transparent"
          pointerEvents="none"
          requiredIndicator={<div />}
        />
      </InputGroup>
    </FormControl>
  );
};

export default TagInput;
