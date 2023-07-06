import { HStack, Icon, Link, useColorMode } from "@chakra-ui/react";
import {
  FaMediumM,
  FaTwitter,
  FaTelegram,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { GiSailboat } from "react-icons/gi";
import type { LinkProps } from "@chakra-ui/react";
import type { IconType } from "react-icons";

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

const SocialButtons: React.FC = () => (
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
);

export default SocialButtons;
