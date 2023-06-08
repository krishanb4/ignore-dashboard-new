export interface Address {
  97?: string;
  56: string;
}

export interface Token {
  symbol: string;
  address?: Address;
  decimals?: number;
  projectLink?: string;
  busdPrice?: string;
}

export enum PoolCategory {
  "NO_LOCK" = "No Lock",
  "15D_LOCK" = "15D Lock",
  "1Y_LOCK" = "1Y Lock",
}

export interface PoolConfig {
  poolId: number;
  name: string;
  token: Token;
  locked: boolean;
  earningToken: Address;
  stakingToken: Address;
  contractAddress: Address;
  poolCategory: PoolCategory;
  sortOrder?: number;
  harvest?: boolean;
  isLp: boolean;
  isFinished: boolean;
  enableEmergencyWithdraw?: boolean;
  buyURL: string;
}
