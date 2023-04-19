import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Link, Stack, Button } from "@chakra-ui/react";
import Typed from "react-typed";

import "./Main.css";

const Main: React.FC = () => {
  return (
    <Stack
      flexGrow="1"
      alignItems="center"
      justifyContent="space-between"
      paddingTop="1rem"
    >
      <Text
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="9xl"
      >
        FLUT
      </Text>

      <Button as={RouterLink} to="/search" colorScheme="blue">
        Launch App
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
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

      <div className="grid">
        <Link
          href="https://medium.com/@TheMagicFlut/why-flut-is-needed-now-45d3fd181cc6"
          isExternal
          className="card"
        >
          <h2>
            Ethos <span>-&gt;</span>
          </h2>
          <p>Why does this matter in the world that we live?</p>
        </Link>

        <Link className="card" target="_blank">
          <h2>
            Contact Us <span>-&gt;</span>
          </h2>

          <p>at team@flut.cloud</p>
        </Link>

        <Link
          href="https://medium.com/@TheMagicFlut/manifesto-9de8fa7439d0"
          isExternal
          className="card"
        >
          <h2>
            White Paper <span>-&gt;</span>
          </h2>
          <p>The Original Manifesto</p>
        </Link>

        <Link as={RouterLink} to="/engineering" className="card">
          <h2>
            Architecture <span>-&gt;</span>
          </h2>
          <p>Take a Look under the Hood</p>
        </Link>
      </div>
    </Stack>
  );
};

export default Main;
