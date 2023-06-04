import { BigNumber } from "ethers";
import { PoolConfig } from "../config/constants/types";

export interface Address {
  56: string;
}

export interface Token {
  symbol: string;
  address?: Address;
  decimals?: number;
  projectLink?: string;
}

export interface Pool extends PoolConfig {
  tokenAmount?: BigNumber;
  quoteTokenAmount?: BigNumber;
  lpTotalInQuoteToken?: BigNumber;
  lpTotalSupply?: BigNumber;
  tokenPriceVsQuote?: BigNumber;
  poolWeight?: BigNumber;
  token: Token;
  userData?: {
    allowance: BigNumber;
    tokenBalance: BigNumber;
    stakedBalance: BigNumber;
    earnings: BigNumber;
    dualEarnings: [BigNumber, BigNumber, BigNumber];
    constraintBalances: BigNumber[];
  };
  tvlLp?: BigNumber;
  tvlToken?: BigNumber;
  tvlInUSD?: BigNumber;
  apr?: number;
}

export interface PoolsState {
  data: Pool[];
}

export interface State {
  // farms: FarmsState;
  // toasts: ToastsState;
  // prices: PriceState;
  pools: PoolsState;
  // profile: ProfileState;
  // teams: TeamsState;
  // achievements: AchievementState;
  // block: BlockState;
}
