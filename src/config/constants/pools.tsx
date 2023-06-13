import tokens from "./tokens";
import { PoolConfig, PoolCategory } from "./types";

const pools: PoolConfig[] = [
  {
    poolId: 1,
    name: "4TOKEN-BNB LP",
    token: tokens.fourtoken,
    locked: false,
    stakingToken: {
      56: "0x9673f9fe264eD0af19ED18d1aC848F384f8fB5F9",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    contractAddress: {
      56: "0x640451baEa0BabDE2f3636FFCAfC0B7318e986d9",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    isLp: true,
    poolCategory: PoolCategory.NO_LOCK,
    harvest: true,
    sortOrder: 1,
    factor: 1,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/add/BNB/0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://pancakeswap.finance/add/BNB/0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4`,
    },
  },
  {
    poolId: 2,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: false,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    contractAddress: {
      56: "0xdeb4fAF9E3d8092aFEdc4B25f2a3d5e61Aa32Dd8",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    isLp: false,
    poolCategory: PoolCategory["NO_LOCK"],
    harvest: true,
    sortOrder: 1,
    factor: 0.00021,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4`,
    },
  },
  {
    poolId: 3,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: true,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    contractAddress: {
      56: "0xf298dBeCe9C82548869545Fa219668AFE523AF02",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    isLp: false,
    poolCategory: PoolCategory["15D_LOCK"],
    harvest: true,
    sortOrder: 1,
    factor: 0.00053,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4`,
    },
  },
  {
    poolId: 4,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: true,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    contractAddress: {
      56: "0x6bDEd208a93226ed57115d65718b7586EFd8Ea1c",
      1116: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    },
    isLp: false,
    poolCategory: PoolCategory["1Y_LOCK"],
    harvest: true,
    sortOrder: 1,
    factor: 0.00041,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4`,
    },
  },
];

export default pools;

// Path: src/config/constants/tokens.tsx
