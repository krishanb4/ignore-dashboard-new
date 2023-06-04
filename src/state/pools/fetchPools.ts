import React from "react";
import poolConfig from "../../config/constants/pools";

const fetchPools = async () => {
  const data = await Promise.all(
    poolConfig.map(async (poolsConfigs) => {
      const apr = 18;
      return {
        ...poolsConfigs,
        tokenAmount: 0,
        tvlToken: 0,
        tvlInUSD: 0,
        apr: apr,
      };
    })
  );

  return data;
};

export default fetchPools;
