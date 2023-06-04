import { ethers } from "ethers";
import { getProvider } from "@wagmi/core";
import bscUSDT from "@/config/abi/bscUSDT.json";
import stakeContract from "@/config/abi/stakeContract.json";
import BigNumber from "bignumber.js";
import { useContractReads } from 'wagmi'




export interface ApprovalResult {
  txHash: string;
  status: "mined" | "failed";
}

export interface BalanceResult {
  balance: any;
}

export interface EarnResult {
  earned: any;
}

export async function approve(
  tokenContractAddress: string,
  spender: string | undefined,
  TokenABI: any,
  amount: ethers.BigNumber,
  signer: any
): Promise<ApprovalResult> {
  try {
    // Create an instance of the ERC20 token contract
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      TokenABI,
      signer
    );

    // Estimate the gas limit for the approval transaction
    const gasLimit = await tokenContract.estimateGas.approve(spender, amount);

    // Build the approval transaction
    const transaction = await tokenContract.populateTransaction.approve(
      spender,
      amount,
      { gasLimit }
    );

    // Sign and send the approval transaction
    const signedTransaction = await signer.sendTransaction(transaction);
    const transactionReceipt = await signedTransaction.wait();

    return {
      txHash: transactionReceipt.transactionHash,
      status: transactionReceipt.status === 1 ? "mined" : "failed",
    };
  } catch (error) {
    console.error(`Failed to approve tokens: ${error}`);
    throw error;
  }
}

// export const getBalance = async (
//   ContractAddress: string,
//   token: string,
//   chainId: number
// ) => {
//   try {
//     const contract_address = ContractAddress as `0x${string}`;
//     const token_address = token as `0x${string}`;
//     const provider = getProvider({
//       chainId: chainId,
//     });
//     const tokenContract = new ethers.Contract(
//       contract_address,
//       bscUSDT,
//       provider
//     );

//     const balance = await tokenContract.balanceOf(token_address);
//     if (balance) {
//       return balance;
//     }
//     return new BigNumber(0);
//   } catch (error) {
//     console.error(`Failed to get balance: ${error}`);
//     throw error;
//   }
// };

// export const getTotalSupply = async (
//   ContractAddress: string,
//   chainId: number
// ) => {
//   try {
//     const contract_address = ContractAddress as `0x${string}`;

//     const provider = getProvider({
//       chainId: chainId,
//     });
//     const tokenContract = new ethers.Contract(
//       contract_address,
//       stakeContract,
//       provider
//     );

//     const balance = await tokenContract.totalSupply();
//     if (balance) {
//       return balance;
//     }
//     return new BigNumber(0);
//   } catch (error) {
//     console.error(`Failed to get totalsupply: ${error}`);
//     throw error;
//   }
// };

// export const getEarned = async (
//   ContractAddress: string,
//   account: string,
//   chainId: number
// ) => {
//   try {
//     const provider = getProvider({
//       chainId: chainId,
//     });
//     const tokenContract = new ethers.Contract(
//       ContractAddress,
//       stakeContract,
//       provider
//     );

//     const earned = await tokenContract.earned(account);
//     if (earned) {
//       return earned;
//     }
//     return new BigNumber(0);
//   } catch (error) {
//     console.error(`Failed to get earn: ${error}`);
//     // throw error;
//   }
// };

// export const getTokenBalance = async (
//   ContractAddress: string,
//   acount: string,
//   chainId: number
// ) => {
//   try {
//     const contract_address = ContractAddress as `0x${string}`;
//     const address = acount as `0x${string}`;
//     const provider = getProvider({
//       chainId: chainId,
//     });
//     const tokenContract = new ethers.Contract(
//       contract_address,
//       bscUSDT,
//       provider
//     );

//     if (address) {
//       const balance = await tokenContract.balanceOf(address);
//       if (balance) {
//         return balance;
//       }

//       return new BigNumber(0);
//     }
//   } catch (error) {
//     console.error(`Failed to get token balance: ${error}`);
//     // throw error;
//   }
// };

// export async function approve(
//   tokenContractAddress: string,
//   spender: string,
//   TokenABI: any,
//   amount: ethers.BigNumber,
//   signer: any
// ): Promise<ApprovalResult> {
//   try {
//     // Create an instance of the ERC20 token contract
//     const tokenContract = new ethers.Contract(
//       tokenContractAddress,
//       TokenABI,
//       signer
//     );

//     // Estimate the gas limit for the approval transaction
//     const gasLimit = await tokenContract.estimateGas.approve(spender, amount);

//     // Build the approval transaction
//     const transaction = await tokenContract.populateTransaction.approve(
//       spender,
//       amount,
//       { gasLimit }
//     );

//     const signedTransaction = await signer.sendTransaction(transaction);
//     const transactionReceipt = await signedTransaction.wait();

//     return {
//       txHash: transactionReceipt.transactionHash,
//       status: transactionReceipt.status === 1 ? "mined" : "failed",
//     };
//   } catch (error) {
//     console.error(`Failed to approve tokens: ${error}`);
//     throw error;
//   }
// }

export const checkApprovedBalance = async (
  tokenContractAddress: string,
  spenderAddress: string,
  userAddress: string,
  tokenABI: any,
  chainId: number
) => {
  try {
    // Create ethers provider
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    const address = userAddress as `0x${string}`;
    const provider = getProvider({
      chainId: chainId,
    });
    // Create token contract instance
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenABI,
      provider
    );

    if (spenderAddress && address) {
      // Check approved balance
      const approvedBalance = await tokenContract.allowance(
        address,
        spenderAddress
      );

      // Return approved balance
      if (approvedBalance) {
        return approvedBalance;
      }
      return new BigNumber(0);
    }
  } catch (error) {
    console.error("Failed to check approved balance:", error);
    // throw error;
  }
};
