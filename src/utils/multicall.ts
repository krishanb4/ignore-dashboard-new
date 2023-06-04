import { ethers } from 'ethers';
import MultiCallAbi from '../config/abi/Multicall.json';
import { getMulticallAddress } from './addressHelpers';
import { getProvider } from "@wagmi/core";
import { useNetwork } from "wagmi";

interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

function GetChains() {
  const { chain } = useNetwork();
  return chain?.id;
}

const multicall = async (abi: any[], calls: Call[]) => {
  const chain_id = GetChains()
  console.log(chain_id);

  const provider = getProvider({
    chainId: chain_id,
  });

  const multi = new ethers.Contract(getMulticallAddress(), MultiCallAbi, provider);
  const itf = new ethers.utils.Interface(abi);

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  console.log(calldata);

  const returnData = await multi.aggregate(calldata);
  const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call));

  return res;
};

export default multicall;
