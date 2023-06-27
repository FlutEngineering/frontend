import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";

const WavyText = styled(Text)`
  --bg: var(--chakra-colors-purple-500);
  --color1: var(--chakra-colors-orange-500);
  --color2: var(--chakra-colors-red-500);
  --_p: 93% 83.5% at;
  --_g1: radial-gradient(var(--_p) bottom, var(--color1) 79.5%, transparent 80%)
    no-repeat;
  --_g2: radial-gradient(var(--_p) top, transparent 79.5%, var(--color1) 80%)
    no-repeat;
  --_g3: radial-gradient(var(--_p) bottom, var(--color2) 79.5%, transparent 80%)
    no-repeat;
  --_g4: radial-gradient(var(--_p) top, transparent 79.5%, var(--color2) 80%)
    no-repeat;

  color: transparent;
  background: var(--_g1), var(--_g2), var(--_g1), var(--_g2), var(--_g3),
    var(--_g4), var(--_g3), var(--_g4), var(--bg);
  background-clip: text;
  animation: s 2s infinite alternate, m 3s infinite ease-out;
  animation-play-state: paused;

  &:hover {
    animation-play-state: running;
  }

  @keyframes m {
    0% {
      background-position: -200% 100%, -100% 100%, 0% 100%, 100% 100%, 0% 10%,
        100% 10%, 200% 10%, 300% 10%;
    }
    100% {
      background-position: 0% 100%, 100% 100%, 200% 100%, 300% 100%, -200% 10%,
        -100% 10%, 0% 10%, 100% 10%;
    }
  }

  @keyframes s {
    0% {
      background-size: 50.5% 60%, 50.5% 60%, 50.5% 60%, 50.5% 60%, 50.5% 90%,
        50.5% 90%, 50.5% 90%, 50.5% 90%;
    }
    33% {
      background-size: 50.5% 70%, 50.5% 70%, 50.5% 70%, 50.5% 70%, 50.5% 75%,
        50.5% 75%, 50.5% 75%, 50.5% 75%;
    }
    66% {
      background-size: 50.5% 55%, 50.5% 55%, 50.5% 55%, 50.5% 55%, 50.5% 80%,
        50.5% 80%, 50.5% 80%, 50.5% 80%;
    }
    100% {
      background-size: 50.5% 90%, 50.5% 90%, 50.5% 90%, 50.5% 90%, 50.5% 95%,
        50.5% 95%, 50.5% 95%, 50.5% 95%;
    }
  }
`;

const Logo: React.FC = () => (
  <WavyText
    as={RouterLink}
    to="/"
    fontSize="5xl"
    fontWeight="extrabold"
    lineHeight="1.1"
    userSelect="none"
  >
    FLUT
  </WavyText>
);

export default Logo;
