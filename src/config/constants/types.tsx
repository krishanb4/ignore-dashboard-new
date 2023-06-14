export interface Address {
  1116?: string;
  56: string;
}

export interface Urls {
  [key: number]: string;
}

export interface Addresses {
  [chainId: number]: `0x${string}`;
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
  earningToken: Addresses;
  stakingToken: Addresses;
  contractAddress: Addresses;
  poolCategory: PoolCategory;
  sortOrder?: number;
  harvest?: boolean;
  isLp: boolean;
  isFinished: boolean;
  enableEmergencyWithdraw?: boolean;
  buyURL: Urls;
  factor: number;
  factorCore: number;
}
