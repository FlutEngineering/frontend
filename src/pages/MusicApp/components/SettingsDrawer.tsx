import {
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { useBalance, useAccount, useEnsName } from "wagmi";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const {
    data: balanceData,
    isError,
    isLoading,
  } = useBalance({
    address: address,
    token: "0x4f08705fb8f33affc231ed66e626b40e84a71870",
  });

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Account</DrawerHeader>
        <DrawerBody>
          <>
            <Accordion allowToggle>
              <HStack>
                <Text fontWeight="bold" color="gray.700">
                  Followers
                </Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="gray.700">
                  Following
                </Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="gray.700">
                  Total Plays
                </Text>
              </HStack>
              {!!balanceData?.formatted && (
                <HStack>
                  <Text fontWeight="bold" color="gray.700">
                    Balance
                  </Text>
                  <Text
                    fontSize="xl"
                    paddingY="5"
                    // fontWeight="bold"
                    color="gray.700"
                  >
                    ${Math.trunc(Number(balanceData?.formatted))} FLUT
                  </Text>
                </HStack>
              )}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Activity
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <StatGroup>
                    <Stat>
                      <StatLabel>Sent</StatLabel>
                      <StatNumber>345,670</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                      </StatHelpText>
                    </Stat>

                    <Stat>
                      <StatLabel>Clicked</StatLabel>
                      <StatNumber>45</StatNumber>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        9.05%
                      </StatHelpText>
                    </Stat>
                  </StatGroup>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Profits & Expenses
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stat>
                    <StatLabel>Collected Fees</StatLabel>
                    <StatNumber>£0.00</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                  </Stat>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default SettingsDrawer;
