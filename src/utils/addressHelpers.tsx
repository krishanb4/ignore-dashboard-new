import { Address } from "@/config/constants/types";
import addresses from "@/config/constants/contracts";

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56;
  const chainId = 56;
  return address[chainId] ? address[chainId] : address[mainNetChainId];
};

export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall);
};
