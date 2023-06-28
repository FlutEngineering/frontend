import { HStack, Flex, Spacer } from "@chakra-ui/react";
import { useMatch } from "react-router-dom";

import Logo from "./Logo";
import ContractAddress from "./ContractAddress";
import SocialButtons from "./SocialButtons";
import UniswapButton from "./UniswapButton";

const Header: React.FC = () => {
  const match = useMatch("/");

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems={{ base: "center", lg: "flex-end" }}
      justifyContent="center"
      width="100%"
    >
      {!match && (
        <>
          <Logo />
          <Spacer />
        </>
      )}
      <ContractAddress />
      <Spacer />
      <HStack>
        <SocialButtons />
        <UniswapButton />
      </HStack>
    </Flex>
  );
};

export default Header;
