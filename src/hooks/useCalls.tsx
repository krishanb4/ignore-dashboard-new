import { useBalance, useContractRead } from "wagmi";
import TokenABI from "@/config/abi/bscUSDT.json";
import stakeContract from "@/config/abi/stakeContract.json";

export function useAllowance(
  stakingaddress: `0x${string}`,
  address: `0x${string}` | undefined,
  contractaddress: `0x${string}`
) {
  try {
    const contractReadAllowance = useContractRead({
      address: stakingaddress,
      abi: TokenABI,
      functionName: "allowance",
      args: [address, contractaddress],
      watch: true,
      cacheTime: 2_000,
    });
    if (contractReadAllowance) {
      return contractReadAllowance;
    }
  } catch (e) {
    // console.log(e);
  }
}

export function useStaked(
  address: `0x${string}` | undefined,
  contractaddress: `0x${string}`
) {
  try {
    const contractReadStakedBalance = useContractRead({
      address: contractaddress,
      abi: TokenABI,
      functionName: "balanceOf",
      args: [address],
      watch: true,
      cacheTime: 2_000,
    });
    return contractReadStakedBalance;
  } catch (e) {}
}

export function useEarn(
  address: `0x${string}` | undefined,
  contractaddress: `0x${string}`
) {
  try {
    const contractReadEarned = useContractRead({
      address: contractaddress,
      abi: stakeContract,
      functionName: "earned",
      args: [address],
      watch: true,
      cacheTime: 2_000,
    });
    return contractReadEarned;
  } catch (e) {}
}

export function useSupply(contractaddress: `0x${string}`) {
  try {
    const contractReadTotalSupply = useContractRead({
      address: contractaddress,
      abi: stakeContract,
      functionName: "totalSupply",
      watch: true,
      cacheTime: 2_000,
    });
    return contractReadTotalSupply;
  } catch (e) {}
}

export function useTokenBalance(
  stakingaddress: `0x${string}`,
  address: `0x${string}` | undefined
) {
  try {
    const userTokenBalance = useBalance({
      address: address,
      token: stakingaddress,
      watch: true,
    });
    return userTokenBalance;
  } catch (e) {}
}
