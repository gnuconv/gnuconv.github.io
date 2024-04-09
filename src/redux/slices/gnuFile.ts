import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
    setGNUFile: (state, action: PayloadAction<GNUFileState>) => {
      state.filename = action.payload.filename;
      state.content = action.payload.content;
    },
  },
});

export const { setGNUFile } = gnuFileSlice.actions;
export const gnuFileReducer = gnuFileSlice.reducer;
export const useGNUFile = () =>
  useSelector((state: RootState) => state.gnuFile);
