import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AnalyzePageState {
  value: AnalyzePage;
}

export const AnalyzePage = Object.freeze({
  EXPENSES: "EXPENSES",
  ASSETS: "ASSETS",
});

export type AnalyzePage = keyof typeof AnalyzePage;

const initialState: AnalyzePageState = {
  value: AnalyzePage.EXPENSES,
};

export const analyzePageSlice = createSlice({
  name: "analyzePage",
  initialState,
  reducers: {
    onAnalyzePageChange: (state, action: PayloadAction<AnalyzePage>) => {
      state.value = action.payload;
    },
  },
});

export const { onAnalyzePageChange } = analyzePageSlice.actions;
export const analyzePageReducer = analyzePageSlice.reducer;

export const selectAnalyzePage = (state: RootState): AnalyzePage =>
  state.analyzePage.value;
