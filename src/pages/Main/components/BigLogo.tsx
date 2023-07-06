import { Box, HStack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const BigLogoTest: React.FC = () => (
  <Text
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgGradient="linear-gradient(to-b, purple.500 0%, purple.500 45%, red.500 45%, red.500 62%, orange.500 62%, orange.500 100%)"
    bgClip="text"
    fontSize="11rem"
    fontWeight="extrabold"
  >
    FLUT
  </Text>
);

const BARS = 60;

const range = (n: number) => [...Array(n).keys()];

const Line = styled(Box)`
  width: 100%;
  --y: calc(
    0.8 * sin(pi / var(--max-x) * var(--x) + var(--pos)) - 0.2 *
      cos(pi / var(--max-x) * 5 * var(--x)) + 0.7
  );
  height: calc(
    100% * (var(--y) * (var(--random) * var(--y))) * var(--top) * var(--speed)
  );
  background-color: var(--chakra-colors-orange-500);
  transition: height var(--time) ease-out;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--chakra-colors-chakra-body-bg);
  }
`;

const LineContainer = styled(HStack)`
  --max-x: ${BARS};
  --pos: 0;
  --speed: 0;
  position: relative;
`;

const BigLogo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: any;
    const listener = (event: MouseEvent) => {
      const ratio = event.clientX / document.body.clientWidth;
      const pos = 1 - ratio * 2;
      const maxMovement = 5;
      const movement = Math.min(
        (Math.abs(event.movementX * 1.5) + Math.abs(event.movementY)) / 2,
        maxMovement
      );
      const speed = 0.2 + 0.8 * (movement / maxMovement);
      ref.current?.style.setProperty("--speed", `${speed}`);
      ref.current?.style.setProperty("--top", "1");
      ref.current?.style.setProperty("--time", "100ms");
      ref.current?.style.setProperty("--pos", `${pos}`);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        ref.current?.style.setProperty("--time", "600ms");
        ref.current?.style.setProperty("--top", "0");
      }, 100);
    };
    document.addEventListener("mousemove", listener);
    return () => {
      document.removeEventListener("mousemove", listener);
      clearTimeout(timeout);
    };
  }, [ref]);

  return (
    <div>
      <svg width="0" height="0">
        <defs>
          <clipPath id="text-clip">
            <text
              x="-11"
              y="138px"
              fontSize="11rem"
              fontWeight="bold"
              fontFamily="var(--chakra-fonts-body)"
            >
              FLUT
            </text>
          </clipPath>
        </defs>
      </svg>
      <LineContainer
        margin="10px 0"
        width="432px"
        height="140px"
        alignItems="flex-end"
        clipPath="url(#text-clip)"
        background="purple.500"
        ref={ref}
      >
        {range(BARS).map((i) => (
          <Line
            css={`
              --x: ${i};
              --random: ${0.5 + 0.5 * Math.random()};
              margin: 0 !important;
            `}
            bgGradient="linear(to-b, red.500 0%, red.500 40%, orange.500 40%, orange.500 68%, cyan.500 68%, cyan.500 100%)"
          />
        ))}
      </LineContainer>
    </div>
  );
};

export default BigLogo;
