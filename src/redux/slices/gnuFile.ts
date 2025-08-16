import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface GNUFileState {
  filename: string;
  content: string;
}

const initialState: GNUFileState = {
  filename: "",
  content: "",
};

export const gnuFileSlice = createSlice({
  name: "gnuFile",
  initialState,
  reducers: {
    onGNUFileUploaded: (state, action: PayloadAction<GNUFileState>) => {
      state.filename = action.payload.filename;
      state.content = action.payload.content;
    },
  },
});

export const { onGNUFileUploaded } = gnuFileSlice.actions;
export const gnuFileReducer = gnuFileSlice.reducer;

export const selectGNUFileName = (state: RootState): string =>
  state.gnuFile.filename;
export const selectGNUFileContent = (state: RootState): string =>
  state.gnuFile.content;
export const selectHasGNUFile = (state: RootState): boolean =>
  state.gnuFile.filename !== "";
