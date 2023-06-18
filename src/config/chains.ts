import { Chain } from "@wagmi/core";

export const chainlist = {

  coreDAO: {
    id: 1116,
    name: "Core DAO",
    network: "coredao",
    nativeCurrency: {
      decimals: 18,
      name: "Core DAO",
      symbol: "CORE",
    },
    rpcUrls: {
      public: { http: ["https://rpc.coredao.org", "https://rpc-core.icecreamswap.com/"] },
      default: { http: ["https://rpc.coredao.org", "https://rpc-core.icecreamswap.com/"] },
    },
    blockExplorers: {
      etherscan: { name: "CoredaoScan", url: "https://scan.coredao.org" },
      default: { name: "CoredaoScan", url: "https://scan.coredao.org" },
    },
    contracts: {
      // multicall3: {
      //   address: "0xca11bde05977b3631167028862be2a173976ca11",
      //   blockCreated: 11_907_934,
      // },
    },
  } as const,
  bscChain: {
    id: 56,
    name: "BSC Chain",
    network: "bsc",
    nativeCurrency: {
      decimals: 18,
      name: "BSC Chain",
      symbol: "BNB",
    },
    rpcUrls: {
      public: { http: ["https://bsc-dataseed1.binance.org", "https://endpoints.omniatech.io/v1/bsc/mainnet/public", "https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d"] },
      default: { http: ["https://bsc-dataseed1.binance.org/"] },
    },
    blockExplorers: {
      etherscan: { name: "BscScan", url: "https://bscscan.com" },
      default: { name: "BscScan", url: "https://bscscan.com" },
    },
    contracts: {
      // multicall3: {
      //   address: "0xca11bde05977b3631167028862be2a173976ca11",
      //   blockCreated: 11_907_934,
      // },
    },
  } as const satisfies Chain,
} as { [key: string]: Chain };
