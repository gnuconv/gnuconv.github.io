import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { parseGNUFile } from "./gnuParse";

export type GNUAccount = {
  name: string;
  type: string;
  id: string;
  parent: string;
};

export type GNUTransaction = {
  id: string;
  description: string;
  value: number;
  date: number;
  splits: GNUSplit[];
};

export type GNUSplit = {
  id: string;
  value: number;
  account: string;
};

export type GNUFileState = {
  filename?: string;

  accounts?: GNUAccount[];
  transactions?: GNUTransaction[];
};

const initialState: GNUFileState = {};

export const gnuSlice = createSlice({
  name: "gnu",
  initialState,
  reducers: {
    onGNUFileUploaded: (
      state,
      action: PayloadAction<{ filename: string; content: string }>
    ) => {
      state.filename = action.payload.filename;
      [state.accounts, state.transactions] = parseGNUFile(
        action.payload.content
      );
    },
  },
});

export const { onGNUFileUploaded } = gnuSlice.actions;

export const selectHasGNUFile = (state: RootState): boolean =>
  !!state.gnu.filename;
export const selectAccounts = (state: RootState): GNUAccount[] =>
  state.gnu.accounts ?? [];
export const selectTransactions = (state: RootState): GNUTransaction[] =>
  state.gnu.transactions ?? [];
