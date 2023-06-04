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
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
    },
    contractAddress: {
      56: "0xc66A9469fA4F5F9AC70484AC7748652fE75006F7",
    },
    isLp: true,
    poolCategory: PoolCategory.NO_LOCK,
    harvest: true,
    sortOrder: 1,
    isFinished: false,
    buyURL: `https://pancakeswap.finance/add/BNB/0x61B83eDF87Ea662C695439A807c386455c9E797C`,
  },
  {
    poolId: 2,
    name: "4TOKEN",
    token: tokens.fourtoken,
    locked: true,
    stakingToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
    },
    earningToken: {
      56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
    },
    contractAddress: {
      56: "0x0A971eBC2332D803285c04AC9D0d80Af9009D4B8",
    },
    isLp: false,
    poolCategory: PoolCategory["15D_LOCK"],
    harvest: true,
    sortOrder: 1,
    isFinished: false,
    buyURL: `https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x61B83eDF87Ea662C695439A807c386455c9E797C`,
  },
  // {
  //   poolId: 3,
  //   name: "1Y LOCK",
  //   token: tokens.fourtoken,
  //   locked: true,
  //   stakingToken: {
  //     56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
  //   },
  //   earningToken: {
  //     56: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
  //   },
  //   contractAddress: {
  //     56: "0xc66A9469fA4F5F9AC70484AC7748652fE75006F7",
  //   },
  //   isLp: false,
  //   poolCategory: PoolCategory["1Y_LOCK"],
  //   harvest: true,
  //   sortOrder: 1,
  //   isFinished: false,
  // },
];

export default pools;
