import { useBalance } from "@wagmi/core";
import { Text } from "@chakra-ui/react";

const FlutBalance = async () => {
  const { data, isError, isLoading } = await useBalance({
    address: "0x4f08705fb8f33affc231ed66e626b40e84a71870",
  });
  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <Text>
      {data?.formatted} {data?.symbol}
    </Text>
  );
};
export default FlutBalance;
