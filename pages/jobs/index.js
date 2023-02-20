import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  Head,
  VStack,
  Link,
} from "@chakra-ui/react";
import {
  IoLogoNodejs,
  IoLogoBitcoin,
  IoGitCommitOutline,
  IoCodeOutline,
  IoLogoJavascript,
} from "react-icons/io5";
import styles from "@/styles/Home.module.css";

import Header from "components/Header";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
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
        paddingY="5vh"
        textAlign="center"
      >
        Jobs
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            $FLUT
          </Text>
          <Heading>A Decentralized Platform for Musicians</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            FLUTE is a new ERC-20 token that aims to revolutionize the music
            industry by creating a decentralized platform for musicians,
            artists, and music lovers.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={IoLogoNodejs} color={"yellow.500"} w={5} h={5} />}
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Back End Engineers"}
            />
            <Feature
              icon={<Icon as={IoCodeOutline} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Solidity Engineers"}
            />
            <Feature
              icon={
                <Icon as={IoLogoJavascript} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Front End Engineers"}
            />
          </Stack>
          <Text>
            We are creating a decentralized music ecosystem where artists and
            musicians can share their work and receive fair compensation, while
            music lovers can enjoy high-quality content at a lower cost. 👍 Our
            chart is here:
          </Text>
          <Link
            target="https://www.dextools.io/app/en/ether/pair-explorer/0xe532b04d2f2e921dfec69e132e9214d2f82df304"
            className={styles.card}
          >
            <Text>
              https://www.dextools.io/app/en/ether/pair-explorer/0xe532b04d2f2e921dfec69e132e9214d2f82df304
            </Text>
          </Link>
          <Text>There are two goals: </Text>
          <Text>
            1) Long term - Create a community and marketplace with balanced
            economics for content creators to get paid and music listeners to
            enjoy on chain.
          </Text>
          <Text>
            2) Short term - Ship prototypes that we can expand on in the
            long-term to keep our Token healthy and pumping.  Paid in $FLUT,
            start immediately.  If things go well you can get paid in stable
            coins
          </Text>
          <Text>
            As an engineer, your first goal is to work with or build an IPFS
            gateway. Normally this is easy since you can simply sign up for a
            service like Pinata which handles a lot of coding for us. Since they
            don't accept Crypto, we either have to find an anonymous credit card
            option, or build the infrastructure ourselves. The platform itself
            is relatively straight-forward:
            <Link
              paddingY="15vh"
              target="https://www.dextools.io/app/en/ether/pair-explorer/0xe532b04d2f2e921dfec69e132e9214d2f82df304"
            >
              <Text color="blue.500">
                https://medium.com/@team_83271/manifesto-9de8fa7439d0
              </Text>
            </Link>
            You will need to email team@flut.cloud with your resume discussing
            how you would approach the problem. You will need to be precise. For
            example:
          </Text>
          <Text>
            'I am a typescript FE developer who enjoys using ChakraUI and
            reac-query to handle data-fetching. I like Wagmi and Rainbow kit for
            ease of implementation even though Wagmi is buggy and releases
            breaking changes faster than I like. I would use Filebase with an
            express server to overcome the KYC obstacle through Pinata. (OR I
            know a way to pay with VISA using crypto)... etc...'
          </Text>
          <Text>
            There are many approaches. We need to know that you understand how
            to build. This is a well-paid position that moves fast. You'll be
            working directly with me as well as our community. This position is
            remote, decentralized, and very fun. 🎉
          </Text>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"/plagueFlute.png"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
