import { useAppDispatch } from "./index";
import { fetchPoolsPublicDataAsync } from "./actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Pool, State } from "./types";

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPoolsPublicDataAsync()).catch((error) => {
      // Handle the error here
      console.error("An error occurred:", error);
    });
  }, [dispatch]);
};

export const usePools = (): Pool[] => {
  const pool = useSelector((state: State) => state.pools.data);
  return pool;
};

export const usePoolFromPid = (pid: number): Pool | undefined => {
  const pool = useSelector((state: State) =>
    state.pools.data.find((f) => f.poolId === pid)
  );
  return pool;
};

export const usePoolUser = (pid: number) => {
  // const pool = usePoolFromPid(pid);
  // const allowance = pool?.userData?.allowance;
  // const tokenBalance = pool?.userData?.tokenBalance;
  // const earning = pool?.userData?.earnings;
  // const stakedBalance = pool?.userData?.stakedBalance;
  // return {
  //   allowance: allowance ?? new BigNumber(0),
  //   tokenBalance: tokenBalance ?? new BigNumber(0),
  //   earnings: earning ?? new BigNumber(0),
  //   stakedBalance: stakedBalance ?? new BigNumber(0),
  //   // tokenBalance:
  //   //   pool?.userData && typeof pool.userData.tokenBalance !== "undefined"
  //   //     ? new BigNumber(await pool.userData.tokenBalance.toString())
  //   //     : new BigNumber(0),
  //   //stakedBalance: farm.userData
  //   //   ? new BigNumber(farm.userData.stakedBalance)
  //   //   : new BigNumber(0),
  //   // earnings: farm.userData
  //   //   ? new BigNumber(farm.userData.earnings)
  //   //   : new BigNumber(0),
  //   // dualEarnings: farm.userData
  //   //   ? farm.userData.dualEarnings
  //   //   : [new BigNumber(0), new BigNumber(0), new BigNumber(0)],
  //   // constraintBalances: farm.userData
  //   //   ? farm.userData.constraintBalances
  //   //   : [new BigNumber(0), new BigNumber(0)],
  // };
};
