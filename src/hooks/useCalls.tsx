import {
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import TokenABI from "@/config/abi/bscUSDT.json";
import stakeContract from "@/config/abi/stakeContract.json";

export function useAllowance(
  stakingaddress: `0x${string}`,
  address: `0x${string}` | undefined,
  contractaddress: `0x${string}`
) {
  const { data } = useContractRead({
    address: stakingaddress,
    abi: TokenABI,
    functionName: "allowance",
    args: [address, contractaddress],
    watch: true,
    cacheTime: 2_000,
  });
  return Number((Number(data) / 10 ** 18).toFixed(2));
}

export function useStaked(
  address: `0x${string}` | undefined,
  contractaddress: `0x${string}`
) {
  const { data } = useContractRead({
    address: contractaddress,
    abi: stakeContract,
    functionName: "balanceOf",
    args: [address],
    watch: true,
    cacheTime: 2_000,
  });

  return Number(data) / 10 ** 18;
}

export function useEarn(
  address: `0x${string}` | undefined,
  contractaddress: `0x${string}`
) {
  const { data } = useContractRead({
    address: contractaddress,
    abi: stakeContract,
    functionName: "earned",
    args: [address],
    watch: true,
    cacheTime: 2_000,
  });
  return Number(data) / 10 ** 18;
}

export function useSupply(contractaddress: `0x${string}`) {
  const { data } = useContractRead({
    address: contractaddress,
    abi: stakeContract,
    functionName: "totalSupply",
    watch: true,
    cacheTime: 2_000,
  });
  return Number(data) / 10 ** 18;
}

export function usePanelty(contractaddress: `0x${string}`) {
  const { data } = useContractRead({
    address: contractaddress,
    abi: stakeContract,
    functionName: "periodPenalty",
    watch: true,
    cacheTime: 2_000,
  });

  return Number(data);
}

export function useTokenBalance(
  stakingaddress: `0x${string}`,
  address: `0x${string}` | undefined
) {
  const { data } = useBalance({
    address: address,
    token: stakingaddress,
    watch: true,
    cacheTime: 2_000,
  });

  return Number(data?.value) / 10 ** 18;
}

export function useContractConfig(contractaddress: `0x${string}`) {
  const { config, error } = usePrepareContractWrite({
    address: contractaddress,
    abi: stakeContract,
    functionName: "getReward",
    cacheTime: 2_000,
  });
  return config;
}

export function useRewardRate(contractaddress: `0x${string}`) {
  const { data } = useContractRead({
    address: contractaddress,
    abi: stakeContract,
    functionName: "rewardPerToken",
    watch: true,
    cacheTime: 2_000,
  });
  return Number(data) / 10 ** 18;
}

export function useContracts(contractaddress: `0x${string}`) {
  const config = useContractConfig(contractaddress);
  const { data, isLoading, isSuccess, write, status } = useContractWrite({
    ...config,
  });
  return { data, isLoading, isSuccess, write, status };
}

export function useTransaction(hash: `0x${string}` | undefined) {
  const transaction = useWaitForTransaction({
    hash: hash,
    onSuccess(data) {
      // console.log("Success", data);
    },
  });
  return transaction;
}
