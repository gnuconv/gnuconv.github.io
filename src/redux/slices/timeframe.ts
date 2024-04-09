import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import dayjs from "dayjs";

export interface TimeframeState {
  start: number;
  end: number;
}

const initialState: TimeframeState = {
  start: dayjs().startOf("month").add(-1, "month").unix(),
  end: dayjs().startOf("month").unix(),
};

export const timeframeSlice = createSlice({
  name: "timeframe",
  initialState,
  reducers: {
    setTimeframe: (state, action: PayloadAction<TimeframeState>) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
  },
});

export const { setTimeframe } = timeframeSlice.actions;
export const timeframeReducer = timeframeSlice.reducer;
export const useTimeframe = () =>
  useSelector((state: RootState) => state.timeframe);
