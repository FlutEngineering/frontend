import { Button, HStack, Image, Link, Text, Tooltip } from "@chakra-ui/react";
import uniswapLogoUrl from "~/assets/uniswap.svg";

const UniswapButton: React.FC = () => (
  <Link
    href="https://app.uniswap.org/#/swap?use=V2&outputCurrency=0x4f08705fb8f33affc231ed66e626b40e84a71870&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
    key="Uniswap"
    isExternal
    _hover={{}}
  >
    <Tooltip label="🌈 No Tax - Set a Low Slippage" placement="top">
      <Button variant="outline" width="120px">
        <HStack>
          <Text textAlign="center">Buy on</Text>
          <Image src={uniswapLogoUrl} w="2rem" />
        </HStack>
      </Button>
    </Tooltip>
  </Link>
);

export default UniswapButton;
