import { Box, Image, Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import React, { useState } from "react";

const ImageWithIcon = ({ src, margin, width }) => {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt="Image"
        width={width}
        margin={margin}
        onMouseEnter={() => {
          setShowIcon(true);
        }}
        onMouseLeave={() => {
          setShowIcon(false);
        }}
      />
      {showIcon && (
        <Icon
          as={FaHome}
          width={8}
          height={8}

          // top="50%"
          // left="50%"
          // transform="translate(-50%, -50%)"
        />
      )}
    </>
  );
};

export default ImageWithIcon;
