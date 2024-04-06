import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface UploadChartState {
  value: string;
}

const initialState: UploadChartState = {
  value: "",
};

export const fileTypeSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setUploadChart: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUploadChart } = fileTypeSlice.actions;
export const uploadChartReducer = fileTypeSlice.reducer;
export const useUploadChart = () =>
  useSelector((state: RootState) => state.uploadChart.value);
