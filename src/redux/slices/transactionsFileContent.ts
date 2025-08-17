import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

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
    onTransactionFileChange: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { onTransactionFileChange } = transactionsFileContentSlice.actions;

export const selectTransactionFileContent = (state: RootState): string =>
  state.transactionsFileContent.value;
