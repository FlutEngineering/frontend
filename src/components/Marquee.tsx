import { Box, BoxProps, keyframes } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";

interface MarqueeProps {
  crop?: boolean;
  children: string;
}

const getDuration = (containerWidth: number, contentWidth: number) => {
  const diff = contentWidth - containerWidth;
  if (diff < 20) return diff * 80;
  if (diff < 50) return diff * 60;
  return diff * 40;
};

const getAnimation = (containerWidth: number, contentWidth: number) => {
  const duration = getDuration(containerWidth, contentWidth) + 1000;
  const start = (500 / duration) * 100;
  const end = 100 - (500 / duration) * 100;
  const animation = keyframes`
  0% {
    transform: translateX(0);
  }
  ${start}% {
    transform: translateX(0);
  }
  ${end}% {
    transform: translateX(-${contentWidth - containerWidth}px);
  }
  100% {
    transform: translateX(-${contentWidth - containerWidth}px);
  }
`;

  return `${animation} ${duration}ms infinite linear alternate`;
};

const Marquee: React.FC<MarqueeProps & BoxProps> = ({
  crop,
  children,
  ...rest
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>();

  useEffect(() => {
    contentRef.current?.classList.remove(...contentRef.current.classList);
  }, [children]);

  useEffect(() => {
    setContainerWidth(containerRef.current?.offsetWidth);
    setContentWidth(contentRef.current?.offsetWidth);
  }, [containerRef.current, contentRef.current, children]);

  const marquee = useMemo(() => {
    if (containerWidth && contentWidth && contentWidth - containerWidth > 10) {
      return getAnimation(containerWidth, contentWidth);
    } else {
      return undefined;
    }
  }, [
    containerWidth,
    contentWidth,
    containerRef.current,
    contentRef.current,
    children,
  ]);

  return (
    <Box
      display="flex"
      alignItems="center"
      overflow="hidden"
      {...rest}
      ref={containerRef}
    >
      <Box
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: crop ? "hidden" : undefined,
        }}
        whiteSpace="nowrap"
        ref={contentRef}
        animation={marquee}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Marquee;
