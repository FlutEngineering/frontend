import {
  Link as RouterLink,
  To,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { Button, Stack, StackProps } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import {
  AiOutlineCloudUpload,
  AiOutlineHome,
  AiOutlineSearch,
  // AiOutlineSetting
} from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import type { ReactElement, ReactNode } from "react";

interface SidebarLinkProps {
  to: To;
  icon: ReactElement;
  label: string;
  children: ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  label,
  icon,
  children,
}) => {
  const { pathname } = useResolvedPath(to);
  const match = useMatch({ path: pathname, end: true });
  const isActive = !!match;

  return (
    <Button
      width="100%"
      justifyContent={{ base: "center", lg: "flex-start" }}
      as={RouterLink}
      to={to}
      leftIcon={icon}
      size="sm"
      variant="outline"
      borderColor="transparent"
      paddingX="2"
      aria-label={label}
      color={isActive ? "purple.500" : undefined}
      _hover={isActive ? {} : undefined}
      _active={isActive ? {} : undefined}
      transitionDuration="150ms"
    >
      {children}
    </Button>
  );
};

const Sidebar: React.FC<StackProps> = (props) => {
  const { address, isConnected } = useAccount();

  return (
    <Stack
      alignItems="flex-start"
      direction={{ base: "row", lg: "column" }}
      justifyContent={{ base: "center", lg: "flex-start" }}
      paddingBottom="2"
      {...props}
    >
      {/* <IconButton
              icon={<AiOutlineSetting />}
              variant="outline"
              onClick={openSettings}
              aria-label="settings"
            /> */}
      <SidebarLink to="/search" label="search" icon={<AiOutlineSearch />}>
        Search
      </SidebarLink>
      <SidebarLink to="/browse" label="browse" icon={<BiLibrary />}>
        Browse
      </SidebarLink>
      {isConnected && (
        <>
          <SidebarLink
            to={`/${address}`}
            label="profile"
            icon={<AiOutlineHome />}
          >
            Profile
          </SidebarLink>
          <SidebarLink
            to="/upload"
            label="upload"
            icon={<AiOutlineCloudUpload />}
          >
            Upload
          </SidebarLink>
        </>
      )}
    </Stack>
  );
};

export default Sidebar;
