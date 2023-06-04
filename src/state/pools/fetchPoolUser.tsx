import { getAddress } from "../../utils/addressHelpers";
import poolsConfig from "../../config/constants/pools";
import tokenABI from "../../config/abi/erc20.json";
import BigNumber from "bignumber.js";
import { useContractRead } from "wagmi";

// export const fetchPoolUserAllowances = async (account: string) => {
//   const data = await Promise.all(
//     poolsConfig.map(async (pool) => {
//       const lpContractAddress = getAddress(pool.stakingToken);
//       const ContractAddress = getAddress(pool.contractAddress);

//       const approveBalance = await checkApprovedBalance(
//         lpContractAddress,
//         ContractAddress,
//         account,
//         tokenABI,
//         56
//       );

//       return approveBalance;
//     })
//   );
//   if (data.length === 0) {
//     return;
//   } else {
//     const parsedLpAllowances = data.map((item) => {
//       if (item === undefined) return new BigNumber(0).toJSON();

//       const parsedValue = new BigNumber(item).toJSON();
//       return parsedValue.toString();
//     });

//     return parsedLpAllowances;
//   }
// };

// export const fetchPoolUserTokenBalances = async (account: string) => {
//   const data = await Promise.all(
//     poolsConfig.map(async (pool) => {
//       const lpContractAddress = getAddress(pool.stakingToken);
//       const tokenBalance = await getTokenBalance(
//         lpContractAddress,
//         account,
//         56
//       ).then((res) => {
//         return res;
//       });
//     })
//   );
//   if (data.length === 0) {
//     return;
//   } else {
//     const parsedLpBalance = data.map((item) => {
//       if (item === undefined) return new BigNumber(0).toJSON();
//       const parsedValue = new BigNumber(item).toJSON();
//       return parsedValue.toString();
//     });

//     return parsedLpBalance;
//   }
// };

// export const fetchPoolUserStakedBalances = async (account: string) => {
//   const data = await Promise.all(
//     poolsConfig.map(async (pool) => {
//       const contractAddress = getAddress(pool.contractAddress);
//       const tokenBalance = await getTokenBalance(
//         contractAddress,
//         account,
//         56
//       ).then((res) => {
//         return res;
//       });
//       return tokenBalance;
//     })
//   );
//   if (data.length === 0) {
//     return;
//   } else {
//     const parsedLpBalance = data.map((item) => {
//       if (item === undefined) return new BigNumber(0).toJSON();
//       const parsedValue = new BigNumber(item).toJSON();
//       return parsedValue.toString();
//     });

//     return parsedLpBalance;
//   }
// };

// export const fetchPoolUserEarn = async (account: string) => {
//   const data = await Promise.all(
//     poolsConfig.map(async (pool) => {
//       const contractAddress = getAddress(pool.contractAddress);
//       const earnedAmount = await getEarned(contractAddress, account, 56);
//       return earnedAmount;
//     })
//   );
//   if (data.length === 0) {
//     return;
//   } else {
//     const parsedLpEarn = data.map((item) => {
//       if (item === undefined) return new BigNumber(0).toJSON();
//       const parsedValue = new BigNumber(item);
//       return parsedValue.toString();
//     });

//     return parsedLpEarn;
//   }
// };
