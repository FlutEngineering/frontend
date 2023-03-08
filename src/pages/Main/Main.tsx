import { Link as RouterLink } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Stack,
  Button,
} from "@chakra-ui/react";
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

      <Button as={RouterLink} to="/app" colorScheme="blue">
        Launch App
      </Button>
      {/* <ConnectButton */}
      {/*   accountStatus={{ */}
      {/*     smallScreen: "avatar", */}
      {/*     largeScreen: "full", */}
      {/*   }} */}
      {/* /> */}
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
        <Link as={RouterLink} to="/meaning" className="card">
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

        <Link as={RouterLink} to="/community" className="card">
          <h2>
            Community <span>-&gt;</span>
          </h2>
          <p>Our museum of community Art</p>
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
