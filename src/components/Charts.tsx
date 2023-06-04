import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import numeral from "numeral";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useCharts from "@/hooks/useCharts";

const ChartCard = ({ children }: { children: React.ReactNode }) => (
  <div className="border-2 border-gray-300 rounded-lg m-10 bg-[#f0ffff]">
    {children}
  </div>
);

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
  } = useCharts();

  const options = {
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      data: [30, 40, 25, 50, 49, 21, 70, 51],
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
    // {
    //   name: "Liquidity (4TOKEN) K",
    //   data: lp[selectSwap.toLowerCase() + "Lp"]
    //     ? lp[selectSwap.toLowerCase() + "Lp"].map(
    //         (item) => item.total_token_amount / 1000
    //       )
    //     : [],
    // },
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

  return (
    <>
      <div className="flex flex-wrap justify-center mt-10 text-center">
        <div className="p-4 w-[20rem] max-w-sm ">
          <div className="rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39]  p-8 flex-col text-center">
            <div className="items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                4TOKEN
              </h2>
            </div>
            <div className="flex flex-col text-black dark:text-white justify-between flex-grow text-center">
              {isLoading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={2} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <ul>
                  <li>
                    Current Supply :{" "}
                    {numeral(tokenData).format("0.000a").toUpperCase()}
                  </li>
                  <li>
                    Price : $
                    {(
                      (Number(archerswapPrice) + Number(iceCreamswapPrice)) /
                      2
                    ).toFixed(6)}
                  </li>
                </ul>
              )}

              {/* <p className="leading-relaxed text-base text-black dark:text-white">
                $0.0007336
              </p> */}
            </div>
          </div>
        </div>

        <div className="p-4 w-[20rem] max-w-sm">
          <div className="flex rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39] p-8 flex-col text-center">
            <div className=" items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                Total Liquidity
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow text-center">
              {isLoading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={1} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <p className="leading-relaxed text-base text-black dark:text-white">
                  $539.05K
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 w-[20rem] max-w-sm">
          <div className="flex rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39] p-8 flex-col text-center">
            <div className=" items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                Token Burned
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow text-center">
              {isLoading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={1} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <p className="leading-relaxed text-base text-black dark:text-white">
                  {numeral(tokenBurnData + tokenBurnDataAuto)
                    .format("0.000a")
                    .toUpperCase()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 w-[20rem] max-w-sm">
          <div className="flex rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39] p-8 flex-col text-center">
            <div className=" items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                Total USDT Rewards
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow text-center ">
              {isLoading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={1} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <p className="leading-relaxed text-base text-black dark:text-white">
                  $
                  {numeral(
                    rewards[rewards.length - 1].cumulative_sum.toFixed(2)
                  )
                    .format("0.000a")
                    .toUpperCase()}{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-10 text-center">
        <div className="p-4 w-[20rem] max-w-sm">
          <div className=" rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39] p-8 flex-col text-center">
            <div className=" items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                ArcherSwap
              </h2>
            </div>
            <div className="flex flex-col justify-between text-black dark:text-white flex-grow text-center">
              {isLoadingPrices ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={2} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <ul>
                  <li>Price : ${archerswapPrice}</li>
                  <li>Liquidity : $539.05K</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 w-[20rem] max-w-sm">
          <div className="flex rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39] p-8 flex-col text-center">
            <div className=" items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                IceCreamSwap
              </h2>
            </div>
            <div className="flex flex-col justify-between text-black dark:text-white flex-grow text-center">
              {isLoadingPrices ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={2} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <ul>
                  <li>Price : ${iceCreamswapPrice}</li>
                  <li>Liquidity : $539.05K</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 w-[20rem] max-w-sm">
          <div className="flex rounded-lg h-full bg-[#e5e5e5] shadow shadow-[#02ad02]/50 dark:bg-[#272e39] p-8 flex-col text-center">
            <div className=" items-center mb-3">
              <h2 className="text-black dark:text-white text-lg font-medium">
                Burned Details
              </h2>
            </div>
            <div className="flex flex-col justify-between text-black dark:text-white flex-grow text-center">
              {isLoading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
                  <p>
                    <Skeleton count={2} duration={2} />
                  </p>
                </SkeletonTheme>
              ) : (
                <ul>
                  <li>
                    Manual :{" "}
                    {numeral(tokenBurnData).format("0.000a").toUpperCase()}
                  </li>
                  <li>
                    Auto :{" "}
                    {numeral(tokenBurnDataAuto).format("0.000a").toUpperCase()}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:grid-cols-2 justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 dark:border-black  border-gray-300 rounded-lg m-10 dark:bg-slate-900 bg-[#f0ffff] chart-container">
            <p className="text-center text-black dark:text-white">
              4TOKEN Price
            </p>
            {isLoading ? (
              <SkeletonTheme baseColor="#e3dede" highlightColor="#a9b7c1">
                <p>
                  <Skeleton count={1} height={350} duration={2} />
                </p>
              </SkeletonTheme>
            ) : (
              <Chart options={options} series={series1} type="area" />
            )}
          </div>
          <div className="border-2 dark:border-black border-gray-300 rounded-lg m-10 dark:bg-slate-900 bg-[#f0ffff] chart-container">
            <p className="text-center text-black dark:text-white">Liquidity</p>
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setIsDropDown(!isDropDown)}
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {selectSwap}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isDropDown ? (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <a
                      onClick={() => {
                        setSwap("ArcherSwap");
                      }}
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      ArcherSwap
                    </a>
                    <a
                      onClick={() => {
                        setSwap("IceCreamSwap");
                      }}
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                    >
                      IceCreamSwap
                    </a>
                    <a
                      onClick={() => {
                        setSwap("PancakeSwap");
                      }}
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-2"
                    >
                      PancakeSwap
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            {isLoading ? (
              <SkeletonTheme baseColor="#e3dede" highlightColor="#a9b7c1">
                <p>
                  <Skeleton count={1} height={350} duration={2} />
                </p>
              </SkeletonTheme>
            ) : (
              <Chart options={options2} series={series2} type="scatter" />
            )}
          </div>
          <div className="border-2 dark:border-black border-gray-300 rounded-lg m-10 dark:bg-slate-900 bg-[#f0ffff] chart-container">
            <p className="text-center text-black dark:text-white">
              USDT Rewards
            </p>
            {isLoading ? (
              <SkeletonTheme baseColor="#e3dede" highlightColor="#a9b7c1">
                <p>
                  <Skeleton count={1} height={350} duration={2} />
                </p>
              </SkeletonTheme>
            ) : (
              <Chart options={options3} series={series3} type="area" />
            )}
          </div>
          <div className="border-2 dark:border-black border-gray-300 rounded-lg m-10 dark:bg-slate-900 bg-[#f0ffff] chart-container">
            <p className="text-center text-black dark:text-white">Token Burn</p>
            {isLoading ? (
              <SkeletonTheme baseColor="#e3dede" highlightColor="#a9b7c1">
                <p>
                  <Skeleton count={1} height={350} duration={2} />
                </p>
              </SkeletonTheme>
            ) : (
              <Chart options={options4} series={series4} type="area" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleCharts;
