import { createSlice } from "@reduxjs/toolkit";
import PoolConfig from "../../config/constants/pools";
import { PoolsState, Pool } from "../types";
import fetchPools from "./fetchPools";

const initialState: PoolsState = { data: [...PoolConfig] };
export const farmsSlice = createSlice({
  name: "Pools",
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const liveFarmsData: Pool[] = action.payload;
      state.data = state.data.map((pool) => {
        const liveFarmData = liveFarmsData.find(
          (f) => f.poolId === pool.poolId
        );
        return { ...pool, ...liveFarmData };
      });
    },
    setPoolsUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload;
      arrayOfUserDataObjects.forEach((userDataEl: any) => {
        const { index } = userDataEl;
        state.data[index] = { ...state.data[index], userData: userDataEl };
      });
    },
  },
});

export const fetchPoolsPublicDataAsync = () => async (dispatch: any) => {
  const pools = await fetchPools();
  dispatch(setPoolsPublicData(pools));
};

export const fetchPoolsUserDataAsync =
  (account: string) => async (dispatch: any) => {
    // const userPoolmAllowances = await fetchPoolUserAllowances(account);
    // const userPoolTokenBalances = await fetchPoolUserTokenBalances(account);
    // const userFarmEarnings = await fetchPoolUserEarn(account);
    // const userPoolStaked = await fetchPoolUserStakedBalances(account);
    // const arrayOfUserDataObjects = userPoolmAllowances?.map(
    //   (farmAllowance, index) => {
    //     return {
    //       index,
    //       allowance: userPoolmAllowances?.[index] ?? 0,
    //       tokenBalance: userPoolTokenBalances?.[index] ?? 0,
    //       stakedBalance: userPoolStaked?.[index] ?? 0,
    //       earnings: userFarmEarnings?.[index],
    //       // dualEarnings: userFarmDualEarnings[index],
    //       // constraintBalances: userConstraintBalances[index],
    //     };
    //   }
    // );
    // dispatch(setPoolsUserData({ arrayOfUserDataObjects }));
  };

export const { setPoolsPublicData, setPoolsUserData } = farmsSlice.actions;

export default farmsSlice.reducer;
