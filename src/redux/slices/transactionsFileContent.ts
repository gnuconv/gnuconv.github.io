import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface TransactionsFileContentState {
  value: string;
}

const initialState: TransactionsFileContentState = {
  value: "",
};

export const transactionsFileContentSlice = createSlice({
  name: "transactionsFileContent",
  initialState,
  reducers: {
    setTransactionsFileContent: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setTransactionsFileContent } =
  transactionsFileContentSlice.actions;

export const transactionsFileContentReducer =
  transactionsFileContentSlice.reducer;

export const useTransactionsFileContent = () =>
  useSelector((state: RootState) => state.transactionsFileContent.value);
