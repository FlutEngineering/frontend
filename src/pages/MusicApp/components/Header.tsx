import { HStack, Grid } from "@chakra-ui/react";

import Logo from "~/components/Logo";
import ContractAddress from "~/components/ContractAddress";
import SocialButtons from "~/components/SocialButtons";
import UniswapButton from "~/components/UniswapButton";
import ConnectButton from "./ConnectButton";

const Header: React.FC = () => {
  return (
    <Grid
      maxWidth="var(--chakra-breakpoints-lg)"
      gridTemplateColumns={{
        base: "auto auto",
        lg: "minmax(auto, 160px) minmax(auto, 1fr) auto auto",
      }}
      gridTemplateRows={{ base: "1fr 1fr", lg: "auto" }}
      gridTemplateAreas={{
        base: `"logo contract-address" "buttons buttons"`,
        lg: `"logo contract-address buttons"`,
      }}
      gridColumnGap={0}
      alignItems="flex-end"
      paddingBottom="30px"
    >
      <Logo gridArea="logo" />
      <ContractAddress
        gridArea="contract-address"
        marginX={5}
        marginBottom="-2px"
        paddingY={2}
      />
      <HStack gridArea="buttons" justifyContent="center">
        <SocialButtons />
        <UniswapButton />
        <ConnectButton />
      </HStack>
    </Grid>
  );
};

export default Header;
