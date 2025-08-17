import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import dayjs from "dayjs";

export type TimeframeState = {
  start: number;
  end: number;
};

const initialState: TimeframeState = {
  start: dayjs().startOf("month").add(-1, "month").unix(),
  end: dayjs().startOf("month").unix(),
};

export const timeframeSlice = createSlice({
  name: "timeframe",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<number>) => {
      state.start = action.payload;
    },
    setEndDate: (state, action: PayloadAction<number>) => {
      state.end = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = timeframeSlice.actions;
export const selectStartDate = (state: RootState): number =>
  state.timeframe.start;
export const selectEndDate = (state: RootState): number => state.timeframe.end;
