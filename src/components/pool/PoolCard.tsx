import Image from "next/image";
import { use, useContext, useEffect, useMemo, useRef, useState } from "react";
import PoolCardDetails from "./PoolCardDetails";
import { Pool } from "../../state/types";
import BigNumber from "bignumber.js";
import useCharts from "@/hooks/useCharts";
import { toast } from "react-toastify";
import { approve, ApprovalResult } from "@/utils/callFunctions";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSigner,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { getAddress } from "@/utils/addressHelpers";
import TokenABI from "@/config/abi/bscUSDT.json";
import stakeContract from "@/config/abi/stakeContract.json";
//import DepositModal from "./modals/DepositModal";
//import WithdrawtModal from "./modals/WithdrawModal";
import Link from "next/link";
import CountdownTimer from "../CountDown";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const DepositModal = dynamic(() => import("./modals/DepositModal"), {
  ssr: false,
});
const WithdrawtModal = dynamic(() => import("./modals/WithdrawModal"), {
  ssr: false,
});
import numeral from "numeral";
import {
  useAllowance,
  useContracts,
  useEarn,
  useStaked,
  useSupply,
  useTokenBalance,
  useTransaction,
} from "@/hooks/useCalls";
export interface PoolsWithStakedValue extends Pool {
  liquidity?: BigNumber;
}

interface PoolCardProps {
  pool: PoolsWithStakedValue;
  userBalance?: number;
}

const PoolCard: React.FC<React.PropsWithChildren<PoolCardProps>> = ({
  pool,
}) => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [expandCard, setExpandCard] = useState(false);
  const earned = useEarn(
    address,
    getAddress(pool.contractAddress) as `0x${string}`
  );
  const allowanceFrom = useAllowance(
    getAddress(pool.stakingToken) as `0x${string}`,
    address,
    getAddress(pool.contractAddress) as `0x${string}`
  );
  const staked = useStaked(
    address,
    getAddress(pool.contractAddress) as `0x${string}`
  );
  // console.log(staked);

  const totalSupply = useSupply(
    getAddress(pool.contractAddress) as `0x${string}`
  );
  const [tvlInUSD, setTvlInUSD] = useState(0);
  const userBalance = useTokenBalance(
    getAddress(pool.stakingToken) as `0x${string}`,
    address
  );
  const { pancakeswapPrice, pancakeswapLPPrice } = useCharts();
  const [tokienPrice, setTokenPrice] = useState(0);

  useEffect(() => {
    if (pool.isLp) {
      setTokenPrice(pancakeswapLPPrice);
    } else {
      setTokenPrice(pancakeswapPrice);
    }
  }, [pancakeswapPrice, pancakeswapLPPrice, pool]);

  let [someState, setSomeState] = useState(0);

  const contractEnd = useContractRead({
    address: getAddress(pool.contractAddress) as `0x${string}`,
    abi: stakeContract,
    functionName: "periodFinish",
  });
  const lessCodeThanCheckingPrevRow = useMemo(
    () => setSomeState(Number(contractEnd.data)),
    [contractEnd.data]
  );

  const countdown = CountdownTimer(someState);
  const [approving, setApproving] = useState(false);
  const { data: signer } = useSigner();

  async function approveTokens() {
    const amount = ethers.utils.parseUnits(
      "115792089237316195423570985008687907853269984665640564039457",
      18
    );
    const signer_from = signer;
    try {
      setApproving(true);
      const approvalResult: ApprovalResult = await approve(
        getAddress(pool.stakingToken),
        getAddress(pool.contractAddress),
        TokenABI,
        amount,
        signer_from
      );
      if (approvalResult.status == "mined") {
        setApproving(false);
        const address_to = address as `0x${string}`;
      }
      await toast.promise(Promise.resolve(), {
        pending: "Approving tokens...",
        success: "Tokens approved successfully 👌",
        error: "Failed to approve tokens",
      });
      setApproving(false);
    } catch (error) {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to approve tokens: " + error, {
          theme: "light",
        });
      } else {
        toast.error("Failed to approve tokens: " + error, {
          theme: "dark",
        });
      }
      console.error(`Failed to approve tokens: ${error}`);
      setApproving(false);
    }
  }
  const HanddleApprove = () => {
    if (approving) return;
    if (!isConnected) return;
    approveTokens().catch((error) => console.log(error));
  };

  const [enableButton, setEnableButton] = useState("Approve");

  useEffect(() => {
    if (isConnected) {
      setEnableButton("Approve");
    } else {
      setEnableButton("Connect Wallet");
    }
  }, [enableButton, isConnected]);

  const [claiming, setClaiming] = useState(false);

  const contractCall = useContracts(
    getAddress(pool.contractAddress) as `0x${string}`
  );

  const transaction = useTransaction(contractCall.data?.hash);

  useEffect(() => {
    if (transaction?.status === "success") {
      // console.log(transaction);

      setClaiming(false);
    }
  }, [transaction]);

  const HanddleClaim = () => {
    if (claiming) return;
    if (!isConnected) return;
    setClaiming(true);
    contractCall.write?.();
  };

  let claimButton;
  if (claiming) {
    claimButton = (
      <button className="opacity-25 bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pt-0 pl-5 pr-5 rounded-[1rem]">
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-0 bg-transparent block antialiased"
            width="18px"
            height="18px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            style={{ shapeRendering: "auto" }}
          >
            <circle
              cx="50"
              cy="50"
              r="0"
              fill="none"
              stroke="#300313"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1s"
                values="0;51"
                keyTimes="0;1"
                keySplines="0 0.2 0.8 1"
                calcMode="spline"
                begin="0s"
              ></animate>
              <animate
                attributeName="opacity"
                repeatCount="indefinite"
                dur="1s"
                values="1;0"
                keyTimes="0;1"
                keySplines="0.2 0 0.8 1"
                calcMode="spline"
                begin="0s"
              ></animate>
            </circle>
            <circle
              cx="50"
              cy="50"
              r="0"
              fill="none"
              stroke="#46dff0"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                repeatCount="indefinite"
                dur="1s"
                values="0;51"
                keyTimes="0;1"
                keySplines="0 0.2 0.8 1"
                calcMode="spline"
                begin="-0.5s"
              ></animate>
              <animate
                attributeName="opacity"
                repeatCount="indefinite"
                dur="1s"
                values="1;0"
                keyTimes="0;1"
                keySplines="0.2 0 0.8 1"
                calcMode="spline"
                begin="-0.5s"
              ></animate>
            </circle>
          </svg>
          <span className="block">Claiming</span>
        </div>
      </button>
    );
  } else if (earned > 0) {
    claimButton = (
      <button
        onClick={HanddleClaim}
        className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pt-0 pl-5 pr-5 rounded-[1rem]"
      >
        Claim
      </button>
    );
  } else {
    claimButton = (
      <button className="opacity-25 bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pt-0 pl-5 pr-5 rounded-[1rem]">
        Claim
      </button>
    );
  }

  return (
    <>
      <div
        key={pool.poolId}
        className={`p-2 mt-5 border bg-[#115657]  border-gray-200 rounded-[1.5rem] shadow dark:border-gray-700 `}
      >
        <div
          className={`grid grid-cols-5`}
          onClick={() => setExpandCard(!expandCard)}
        >
          <div className="flex items-center col-span-1">
            <Image src="/images/4logo.png" alt="" width={30} height={30} />
            <div className="grid grid-cols-1 gap-1 text-left">
              <span className="font-medium text-white text-[15px] ml-[10px]">
                {pool.name}
              </span>
              <span className=" text-gray-400 text-sm flex-none ml-[10px] ">
                {pool.poolCategory}
              </span>
            </div>
          </div>

          <PoolCardDetails
            earn={earned}
            tvl={totalSupply * tokienPrice}
            displayApr={pool.apr}
          />

          {chain?.id === 56 ? (
            <div className="flex justify-center col-1">{claimButton}</div>
          ) : isConnected ? (
            <button
              onClick={() => switchNetwork?.(56)}
              className="bg-gradient-to-br from-red-400 to-red-300 text-white text-sm pt-0 pl-5 pr-5 rounded-[1rem]"
            >
              Wrong Network
            </button>
          ) : (
            <button className="bg-gradient-to-br from-red-400 to-red-300 text-white text-sm pt-0 pl-5 pr-5 rounded-[1rem]">
              Connect Wallet
            </button>
          )}
          <div className="flex items-center col-span-1 justify-end p-4">
            <button
              onClick={
                expandCard
                  ? () => setExpandCard(false)
                  : () => setExpandCard(true)
              }
            >
              {expandCard ? (
                <Image
                  src="/images/up-arrow.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/images/down-arrow.svg"
                  alt=""
                  className="transform rotate-360"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>
        {expandCard ? (
          ""
        ) : (
          <div>
            <div className="grid  justify-center gap-4 grid-cols-3 space-x-4">
              <span className="px-4 py-2 text-black dark:text-white md:hidden flex justify-center">
                TVL
              </span>
              <span className="px-4 py-2 text-black dark:text-white flex md:hidden justify-center">
                APR
              </span>
              <span className="px-4 py-2 text-black dark:text-white flex md:hidden justify-center">
                Earned
              </span>
            </div>
            <div className="grid grid-cols-3 justify-center space-x-4">
              <span className="px-4 py-2 text-white flex md:hidden  justify-center">
                ${Number(totalSupply * tokienPrice).toFixed(2)}
              </span>
              <span className="px-4 py-2 text-white flex md:hidden  justify-center">
                {pool.apr}%
              </span>
              <span className="px-4 py-2 text-white flex md:hidden justify-center">
                {earned > 0 ? earned.toFixed(3) : 0}
              </span>
            </div>
          </div>
        )}
        <div>
          {countdown ? (
            <div className="relative ml-[40px] flex text-white justify-start">
              Ends in: {countdown}
              {pool.locked ? (
                <span className=" text-[#ff4343] top-0 right-0 ml-[30px]">
                  Early unstaking will cost you 4% penalty
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#a9b7c1">
              <p>
                <Skeleton count={1} duration={2} />
              </p>
            </SkeletonTheme>
          )}
        </div>
        {expandCard ? (
          <div className="border-b border-[#1e6365] my-4"></div>
        ) : (
          ""
        )}
        {expandCard ? (
          <div className="grid grid-cols-3 ">
            <div className="col-1">
              <div className="text-[#669ca0]">Your deposit</div>
              <div className="text-white md:text-[3rem] text-[2rem]">
                {staked > 0 ? numeral(staked).format("0.0a") : 0}
                <span className="text-sm grid">
                  ($
                  {staked > 0 &&
                  Number(numeral(staked * tokienPrice).format("0.000a")) > 0
                    ? numeral(staked * tokienPrice).format("0.000a")
                    : 0}
                  )
                </span>
              </div>
            </div>
            <div className="col-1">
              <div className="text-[#669ca0]">APR%</div>
              <div className="text-white md:text-[3rem] text-[2rem]">
                {pool.apr}%
              </div>
            </div>
            <div className="col-1">
              <div className="text-[#669ca0]">Earning</div>
              <div className="text-green-400 md:text-[3rem] text-[2rem] text-gradient-to-b">
                {earned > 0 ? earned.toFixed(3) : 0}
              </div>
              <span className="text-sm text-white">4TOKEN</span>
            </div>
          </div>
        ) : (
          ""
        )}
        {expandCard ? (
          <div>
            <div className="grid-cols-3 hidden md:grid mt-[20px]">
              <div className="col-1">
                <div className="text-[#669ca0]">
                  {Number(allowanceFrom) > 0 ? (
                    <>
                      <DepositModal
                        contract={pool.contractAddress}
                        poolId={pool.poolId}
                        name={pool.name}
                        userBalance={userBalance}
                        endedpool={pool.isFinished}
                      />
                      {staked > 0 ? (
                        <WithdrawtModal
                          contract={pool.contractAddress}
                          poolId={pool.poolId}
                          name={pool.name}
                          userBalance={staked}
                          locked={pool.locked}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <button
                      onClick={HanddleApprove}
                      className={`${approving ? "opacity-25" : ""} ${
                        isConnected ? "" : "opacity-25"
                      } bg-gradient-to-br w-[120px] from-green-400 ml-1 to-yellow-300 text-black text-sm  p-3 pl-5 pr-5 rounded-[1rem]`}
                    >
                      {approving ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="hidden md:block">Approve </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-0 bg-transparent block antialiased"
                            width="18px"
                            height="18px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                            style={{ shapeRendering: "auto" }}
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="0"
                              fill="none"
                              stroke="#300313"
                              strokeWidth="2"
                            >
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0;51"
                                keyTimes="0;1"
                                keySplines="0 0.2 0.8 1"
                                calcMode="spline"
                                begin="0s"
                              ></animate>
                              <animate
                                attributeName="opacity"
                                repeatCount="indefinite"
                                dur="1s"
                                values="1;0"
                                keyTimes="0;1"
                                keySplines="0.2 0 0.8 1"
                                calcMode="spline"
                                begin="0s"
                              ></animate>
                            </circle>
                            <circle
                              cx="50"
                              cy="50"
                              r="0"
                              fill="none"
                              stroke="#46dff0"
                              strokeWidth="2"
                            >
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0;51"
                                keyTimes="0;1"
                                keySplines="0 0.2 0.8 1"
                                calcMode="spline"
                                begin="-0.5s"
                              ></animate>
                              <animate
                                attributeName="opacity"
                                repeatCount="indefinite"
                                dur="1s"
                                values="1;0"
                                keyTimes="0;1"
                                keySplines="0.2 0 0.8 1"
                                calcMode="spline"
                                begin="-0.5s"
                              ></animate>
                            </circle>
                          </svg>
                        </div>
                      ) : (
                        <span className="hidden md:block">{enableButton} </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="col-1">
                <div className="text-[#669ca0] mt-[20px]">
                  <Link
                    href={pool.buyURL}
                    target="_blank"
                    className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pl-5 pr-5 rounded-[1rem]"
                  >
                    {pool.isLp ? "Add" : "Buy"} {pool.name}
                  </Link>
                </div>
              </div>
              <div className="col-1">
                <div className="text-[#669ca0] mt-[20px]">
                  <Link
                    href={`https://bscscan.com/address/${getAddress(
                      pool.contractAddress
                    )}`}
                    target="_blank"
                    className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pl-5 pr-5 rounded-[1rem]"
                  >
                    Contract Address
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:hidden mt-[20px] ">
              <div className="col-1">
                <div className="text-[#669ca0]">
                  {Number(allowanceFrom) > 0 ? (
                    <>
                      <DepositModal
                        contract={pool.contractAddress}
                        poolId={pool.poolId}
                        name={pool.name}
                        userBalance={userBalance}
                        endedpool={pool.isFinished}
                      />
                      {staked > 0 ? (
                        <WithdrawtModal
                          contract={pool.contractAddress}
                          poolId={pool.poolId}
                          name={pool.name}
                          userBalance={staked}
                          locked={pool.locked}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <button
                      onClick={HanddleApprove}
                      className={`${approving ? "opacity-25" : ""} ${
                        isConnected ? "" : "opacity-25"
                      } bg-gradient-to-br w-[120px] from-green-400 ml-1 to-yellow-300 text-black text-sm  p-3 pl-5 pr-5 rounded-[1rem]`}
                    >
                      {approving ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="hidden md:block">Approve </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="m-0 bg-transparent block antialiased"
                            width="18px"
                            height="18px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                            style={{ shapeRendering: "auto" }}
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="0"
                              fill="none"
                              stroke="#300313"
                              strokeWidth="2"
                            >
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0;51"
                                keyTimes="0;1"
                                keySplines="0 0.2 0.8 1"
                                calcMode="spline"
                                begin="0s"
                              ></animate>
                              <animate
                                attributeName="opacity"
                                repeatCount="indefinite"
                                dur="1s"
                                values="1;0"
                                keyTimes="0;1"
                                keySplines="0.2 0 0.8 1"
                                calcMode="spline"
                                begin="0s"
                              ></animate>
                            </circle>
                            <circle
                              cx="50"
                              cy="50"
                              r="0"
                              fill="none"
                              stroke="#46dff0"
                              strokeWidth="2"
                            >
                              <animate
                                attributeName="r"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0;51"
                                keyTimes="0;1"
                                keySplines="0 0.2 0.8 1"
                                calcMode="spline"
                                begin="-0.5s"
                              ></animate>
                              <animate
                                attributeName="opacity"
                                repeatCount="indefinite"
                                dur="1s"
                                values="1;0"
                                keyTimes="0;1"
                                keySplines="0.2 0 0.8 1"
                                calcMode="spline"
                                begin="-0.5s"
                              ></animate>
                            </circle>
                          </svg>
                        </div>
                      ) : (
                        <span className="block md:hidden">{enableButton}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-1">
                  <div className="text-[#669ca0] mt-[20px]">
                    <Link
                      href={pool.buyURL}
                      target="_blank"
                      className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pl-5 pr-5 rounded-[1rem]"
                    >
                      {pool.isLp ? "Add" : "Buy"} {pool.name}
                    </Link>
                  </div>
                </div>
                <div className="col-1">
                  <div className="text-[#669ca0] mt-[20px]">
                    <Link
                      href={`https://bscscan.com/address/${getAddress(
                        pool.contractAddress
                      )}`}
                      target="_blank"
                      className="bg-gradient-to-br from-green-400 to-yellow-300 text-black text-sm pl-5 pr-5 rounded-[1rem]"
                    >
                      Contract Address
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PoolCard;
