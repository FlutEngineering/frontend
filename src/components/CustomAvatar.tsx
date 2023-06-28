import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { Address } from "wagmi";
import Identicon from "./Identicon";

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: "50%" }}
    />
  ) : (
    <Identicon address={address as Address} size={size} />
  );
};

export default CustomAvatar;
