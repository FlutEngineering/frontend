import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { ThemeOptions } from "@rainbow-me/rainbowkit/dist/themes/baseTheme";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    purple: {
      50: "#f6e9ff",
      100: "#ddc3f1",
      200: "#c59de3",
      300: "#ae75d6",
      400: "#974eca",
      500: "#7e35b0",
      600: "#62298a",
      700: "#461d63",
      800: "#2b103d",
      900: "#110419",
    },
    red: {
      50: "#ffe2ec",
      100: "#ffb3c5",
      200: "#fc839f",
      300: "#f95278",
      400: "#f62252",
      500: "#dd0939",
      600: "#ad032c",
      700: "#7c001e",
      800: "#4d0012",
      900: "#200005",
    },
    orange: {
      50: "#fff1db",
      100: "#ffd7af",
      200: "#fdbf7f",
      300: "#fca550",
      400: "#fa8b1f",
      500: "#e07205",
      600: "#af5802",
      700: "#7e3e00",
      800: "#4d2500",
      900: "#1f0b00",
    },
    gray: {
      50: "#f8f0f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#120b0d",
    },
    cyan: {
      50: "#dafeff",
      100: "#b2f4fc",
      200: "#85ebf8",
      300: "#58e3f3",
      400: "#32dbef",
      500: "#1dc2d5",
      600: "#0c97a7",
      700: "#006c78",
      800: "#004249",
      900: "#00181b",
    },
  },
});

export const rainbotkitTheme: ThemeOptions = {
  accentColor: "#7e35b0",
  accentColorForeground: "white",
  borderRadius: "small",
  overlayBlur: "small",
};

export default theme;
