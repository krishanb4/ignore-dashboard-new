import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import numeral from "numeral";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useCharts from "@/hooks/useCharts";

const ExampleCharts = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectSwap, setSelectSwap] = useState("Select Swap");
  function setSwap(swap: string) {
    setSelectSwap(swap);
    setIsDropDown(false);
  }

  const {
    tokenData,
    tokenBurnData,
    tokenBurnDataAuto,
    tokenBurnDataBSC,
    dataCategories,
    autoburnData,
    manualBurnData,
    isLoading,
    isLoadingPrices,
    archerswapPrice,
    iceCreamswapPrice,
    pancakeswapPrice,
    archerswapLPPrice,
    iceCreamswapLPPrice,
    pancakeswapLPPrice,
    rewards,
    lp,
    price,
    archerswapTotalLP,
    pancakeSwapTotalLP,
  } = useCharts();

  const options = {
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: price?.map((prices: any) => {
        const timestamp = prices[0];
        // Assuming you want to format the timestamp as a readable date/time string
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust the formatting as per your requirements
      }),
      labels: {
        style: {
          colors: "#34545f",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return "$" + value;
        },
        style: {
          colors: "#34545f",
        },
      },
    },
  };
  const options2 = {
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      categories: lp[selectSwap.toLowerCase() + "Lp"]
        ? lp[selectSwap.toLowerCase() + "Lp"].map((item) =>
            new Date(item.date).toLocaleDateString()
          )
        : [],
      labels: {
        style: {
          colors: "#34545f",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#34545f",
        },
      },
    },
  };
  const options3 = {
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      categories: rewards.map((item) =>
        new Date(item.date).toLocaleDateString()
      ),
      labels: {
        style: {
          colors: "#34545f",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#34545f",
        },
      },
    },
  };
  const options4 = {
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      categories: dataCategories,
      labels: {
        style: {
          colors: "#34545f",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function formatNumber(value: number) {
          var val = Math.abs(value);
          var formattedValue;

          if (val >= 1000000000) {
            formattedValue = (val / 1000000000).toFixed(1) + " B";
          } else if (val >= 1000000) {
            formattedValue = (val / 1000000).toFixed(1) + " M";
          } else if (val >= 1000) {
            formattedValue = (val / 1000).toFixed(1) + " K";
          } else {
            formattedValue = val.toFixed(0);
          }

          return formattedValue;
        },

        style: {
          colors: "#34545f",
        },
      },
    },
  };
  const series1 = [
    {
      name: "token-price",
      data: price?.map((prices: any) => {
        const price4 = prices[1];
        return price4.toFixed(5);
      }),
    },
  ];
  const series2 = [
    {
      name: "Liquidity (WETH)",
      data: lp[selectSwap.toLowerCase() + "Lp"]
        ? lp[selectSwap.toLowerCase() + "Lp"].map(
            (item) => item.total_weth_amount
          )
        : [],
    },
  ];
  const series3 = [
    {
      name: "Rewards (USDT)",
      data: rewards.map((item) => item.cumulative_sum),
    },
  ];
  const series4 = [
    {
      name: "manual-burn",
      data: manualBurnData,
    },
    {
      name: "auto-burn",
      data: autoburnData,
    },
  ];

  return <></>;
};

export default ExampleCharts;
