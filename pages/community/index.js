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
  Button,
} from "@chakra-ui/react";

import { FaMediumM, FaTwitter, FaTelegram } from "react-icons/fa";
import Header from "components/Header";

import ipfsClient from "ipfs-http-client";
import ReactAudioPlayer from "react-audio-player";

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
        <Text
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="5xl"
          paddingY="15vh"
          textAlign="center"
        >
          Community Art
        </Text>
        <Text
          fontSize="large"
          lineHeight="260%"
          marginX={{ base: "1vw", medium: "15vw" }}
          textAlign="center"
        >
          Our first Upload ❤️
        </Text>

        <ReactAudioPlayer src="/FLUT.wav" autoPlay controls />

        <Box marginY="50">
          <Text
            fontSize="large"
            lineHeight="260%"
            marginX={{ base: "1vw", medium: "15vw" }}
            textAlign="center"
          ></Text>
          <Image src="/plagueFlute.png" width="500" height="500" />
        </Box>
        <Image src="/cowboyFlute.jpeg" width="500" height="500" />
      </Box>
    </Box>
  );
}
