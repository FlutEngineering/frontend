import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Code,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";

const ContractAddress: React.FC<LinkBoxProps> = (props) => {
  return (
    <LinkBox _hover={{ code: { bg: "whiteAlpha.300" } }} {...props}>
      <Text as="sub" color="gray">
        Ethereum Mainnet Contract
      </Text>
      <LinkOverlay
        display="block"
        href="https://etherscan.io/token/0x4F08705FB8F33AffC231ed66e626B40E84A71870"
        key="Etherscan"
        isExternal
      >
        <Code
          paddingTop="3px"
          paddingX="6px"
          transition="background-color 200ms"
          whiteSpace="nowrap"
          bg="whiteAlpha.200"
        >
          0x4F08705FB8F33AffC231ed66e626B40E84A71870
          <ExternalLinkIcon marginLeft="1" marginTop="-4px" />
        </Code>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ContractAddress;
