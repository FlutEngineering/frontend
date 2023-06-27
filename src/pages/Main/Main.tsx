import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack, Button, Flex, Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Typed from "react-typed";

import BigLogo from "./components/BigLogo";

const CardContainer = styled(Grid)`
  grid-template-columns: repeat(4, minmax(25%, auto));
  max-width: 100%;

  /* Mobile */
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    max-width: 320px;
    text-align: center;
  }

  /* Tablet and Smaller Desktop */
  @media (min-width: 701px) and (max-width: 1120px) {
    grid-template-columns: repeat(2, 50%);
  }
`;

const Card = styled(Link)`
  padding: 1rem 1.2rem;
  margin: 0.5rem;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background 200ms, border 200ms;

  span {
    display: inline-block;
    transition: transform 200ms;
  }

  h2 {
    font-family: "Inter", system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  p {
    margin: 0;
    opacity: 0.6;
    font-size: 0.9rem;
    line-height: 1.5;
    max-width: 30ch;
  }

  &:hover {
    text-decoration: none;
  }

  /* Enable hover only on non-touch devices */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(180, 185, 188, 0.1);
      border-color: rgba(131, 134, 135, 0.15);
    }

    &:hover span {
      transform: translateX(4px);
    }
  }

  @media (prefers-reduced-motion) {
    &:hover span {
      transform: none;
    }
  }

  /* Mobile */
  @media (max-width: 700px) {
    padding: 1rem 2.5rem;

    h2 {
      margin-bottom: 0.5rem;
    }
  }
`;

const Main: React.FC = () => {
  return (
    <Stack
      flexGrow="1"
      alignItems="center"
      justifyContent="space-between"
      paddingTop="1rem"
    >
      <Flex grow="1" direction="column" justifyContent="center">
        <BigLogo />
      </Flex>
      <Flex grow="1" direction="row" justifyContent="center">
        <Button
          as={RouterLink}
          to="/search"
          colorScheme="gray"
          _hover={{ bg: "purple.600" }}
        >
          Launch App
        </Button>
      </Flex>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        fontSize="xl"
      >
        <Typed
          strings={[
            "Equity, Creative Compensation, Decentralization",
            "Envision a more sustainable music industry",
            "Building.. building.. building..",
          ]}
          typeSpeed={45}
          backSpeed={30}
          loop
        ></Typed>
      </Box>

      <CardContainer>
        <Card
          href="https://medium.com/@TheMagicFlut/why-flut-is-needed-now-45d3fd181cc6"
          isExternal
        >
          <h2>
            Ethos <span>-&gt;</span>
          </h2>
          <p>Why does this matter in the world that we live?</p>
        </Card>

        <Card target="_blank">
          <h2>
            Contact Us <span>-&gt;</span>
          </h2>

          <p>at team@flut.cloud</p>
        </Card>

        <Card
          href="https://medium.com/@TheMagicFlut/manifesto-9de8fa7439d0"
          isExternal
        >
          <h2>
            White Paper <span>-&gt;</span>
          </h2>
          <p>The Original Manifesto</p>
        </Card>

        <Card as={RouterLink} to="/engineering">
          <h2>
            Architecture <span>-&gt;</span>
          </h2>
          <p>Take a Look under the Hood</p>
        </Card>
      </CardContainer>
    </Stack>
  );
};

export default Main;
