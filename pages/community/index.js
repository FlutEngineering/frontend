import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Typed from "react-typed";
import { render } from "react-dom";

import {
  Box,
  Image as ChakraImage,
  Text,
  Heading,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";

import { FaMediumM, FaTwitter, FaTelegram } from "react-icons/fa";
import Header from "components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box>
      <Head>
        <title>The Decentralized Music Platform</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flut.ico" />
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        padding="6rem"
        minHeight="100vh"
      >
        <Header />
      </Box>
    </Box>
  );
}
