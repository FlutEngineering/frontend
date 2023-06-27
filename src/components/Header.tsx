import {
  useColorMode,
  HStack,
  Link,
  Icon,
  Text,
  Flex,
  LinkProps,
  LinkBox,
  LinkOverlay,
  Code,
  Spacer,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FaMediumM,
  FaTwitter,
  FaTelegram,
  FaHome,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import type { IconType } from "react-icons";

import UniswapButton from "./UniswapButton";
import Logo from "./Logo";
import { useMatch } from "react-router-dom";

type HeaderLinkProps = {
  icon: IconType;
} & LinkProps;

const HeaderLink: React.FC<HeaderLinkProps> = ({ icon, ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <Link
      display="flex"
      width="28px"
      height="28px"
      justifyContent="center"
      alignItems="center"
      _hover={{
        svg: {
          color: colorMode === "dark" ? "white" : "black",
          transition: "250ms",
        },
      }}
      isExternal
      {...props}
    >
      <Icon width="18px" height="18px" as={icon} color="gray" />
    </Link>
  );
};

const ContractAddress: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <LinkBox padding={2} marginX={2} _hover={{ code: { bg: "gray.600" } }}>
      <Text as="sub" color="gray">
        Ethereum Mainnet Contract &nbsp;
      </Text>
      <LinkOverlay
        display="block"
        href="https://etherscan.io/token/0x4F08705FB8F33AffC231ed66e626B40E84A71870"
        key="Etherscan"
        isExternal
      >
        {/* TODO: add External link icon, change colorScheme of `Code`, add linebreak */}
        <Code
          paddingTop="3px"
          paddingX="6px"
          transition="background-color 200ms"
          whiteSpace="nowrap"
        >
          0x4F08705FB8F33AffC231ed66e626B40E84A71870
          <ExternalLinkIcon marginLeft="1" marginTop="-4px" />
        </Code>
      </LinkOverlay>
    </LinkBox>
  );
};

const Header = () => {
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
        <HStack marginRight="2" spacing={{ base: 0.5, lg: 1 }}>
          <HeaderLink
            href="https://t.me/+BhXkKrFweoAzODcx"
            key="Telegram"
            icon={FaTelegram}
          />
          <HeaderLink
            href="https://medium.com/@TheMagicFlut"
            key="Medium"
            icon={FaMediumM}
          />
          <HeaderLink
            href="https://twitter.com/TheMagicFlut"
            key="Twitter"
            icon={FaTwitter}
          />
          <HeaderLink
            href="https://discord.gg/NXjGj9kHus"
            key="Discord"
            icon={FaDiscord}
          />
          <HeaderLink
            href="https://github.com/FlutEngineering"
            key="Github"
            icon={FaGithub}
          />
          <HeaderLink
            href="https://opensea.io/TheMagicFlut"
            key="Opensea"
            icon={GiSailboat}
          />
        </HStack>

        <UniswapButton />
      </HStack>
    </Flex>
  );
};
export default Header;
