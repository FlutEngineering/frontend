import { HStack, Flex, Spacer } from "@chakra-ui/react";

import Logo from "~/components/Logo";
import ContractAddress from "~/components/ContractAddress";
import SocialButtons from "~/components/SocialButtons";
import UniswapButton from "~/components/UniswapButton";
import ConnectButton from "./ConnectButton";

const Header: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems={{ base: "center", lg: "flex-end" }}
      justifyContent="center"
      width="100%"
      paddingBottom="30px"
    >
      <Logo />
      <Spacer />
      <ContractAddress />
      <Spacer />
      <HStack>
        <SocialButtons />
        <UniswapButton />
        <ConnectButton />
      </HStack>
    </Flex>
  );
};

export default Header;
