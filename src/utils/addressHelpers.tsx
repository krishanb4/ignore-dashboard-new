import { Address } from "@/config/constants/types";
import addresses from "@/config/constants/contracts";

export interface Addresses {
  [chainId: number]: `0x${string}`;
}

export const getAddress = (address: Addresses, chainId?: number): string => {
  const mainNetChainId = 56;

  if (chainId !== undefined && address[chainId]) {
    return address[chainId];
  } else {
    return address[mainNetChainId];
  }
};

// export const getMulticallAddress = () => {
//   return getAddress(addresses.mulltiCall);
// };
