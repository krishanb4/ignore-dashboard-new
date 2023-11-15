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
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    contractAddress: {
      56: "0x640451baEa0BabDE2f3636FFCAfC0B7318e986d9",
      1116: "0x78F1072ca3A8279D3d961ab904d61E3032C2302a",
    },
    isLp: true,
    poolCategory: PoolCategory.NO_LOCK,
    harvest: true,
    sortOrder: 1,
    factor: 0.000003,
    factorCore: 1,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/v2/add/0x61B83eDF87Ea662C695439A807c386455c9E797C/BNB`,
      1116: `https://exchange.archerswap.finance/swap?outputCurrency=0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e`,
    },
  },
  {
    poolId: 2,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: false,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    contractAddress: {
      56: "0xdD70125F56cD103B321981Aab17D54A25DB44E5d",
      1116: "0x78F1072ca3A8279D3d961ab904d61E3032C2302a",
    },
    isLp: false,
    poolCategory: PoolCategory["NO_LOCK"],
    harvest: true,
    sortOrder: 1,
    factor: 0.000009,
    factorCore: 0.000000015,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://exchange.archerswap.finance/swap?outputCurrency=0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e`,
    },
  },
  {
    poolId: 3,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: true,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    contractAddress: {
      56: "0xeC16a72e96e71640175CbEBEcb9a4FB281C6cEFA",
      1116: "0xCD2A88F7EA6E59F7f78714C41eda99066d54B352",
    },
    isLp: false,
    poolCategory: PoolCategory["15D_LOCK"],
    harvest: true,
    sortOrder: 1,
    factor: 0.000013515,
    factorCore: 0.000000006,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://exchange.archerswap.finance/swap?outputCurrency=0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e`,
    },
  },
  {
    poolId: 4,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: true,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
      1116: "0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e",
    },
    contractAddress: {
      56: "0x471410a0473679a8C7dda5389E875Fd8c0880C5A",
      1116: "0xD3B87d4321a70c8754A47bCCa79d544Bc9DC381b",
    },
    isLp: false,
    poolCategory: PoolCategory["1Y_LOCK"],
    harvest: true,
    sortOrder: 1,
    factor: 0.000016,
    factorCore: 0.000000014,
    isFinished: false,
    buyURL: {
      56: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
      1116: `https://exchange.archerswap.finance/swap?outputCurrency=0x98564e70c7fcc6d947ffe6d9efed5ba68b306f2e`,
    },
  },
];

export default pools;

// Path: src/config/constants/tokens.tsx
