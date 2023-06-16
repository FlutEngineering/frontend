import { Text } from "@chakra-ui/react";

const Logo: React.FC = () => (
  <Text
    bgGradient="linear-gradient(to-b, purple.500 0%, purple.500 43%, red.500 43%, red.500 60%, orange.500 60%, orange.500 100%)"
    bgClip="text"
    fontSize="6xl"
    fontWeight="extrabold"
  >
    FLUT
  </Text>
);

export default Logo;
