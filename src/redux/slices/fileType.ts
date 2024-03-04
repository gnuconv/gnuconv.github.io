import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface FileTypeState {
  value: string;
}

export enum FileType {
  TD = "TD",
  RBC = "RBC",
}

const initialState: FileTypeState = {
  value: "TD",
};

export const fileTypeSlice = createSlice({
  name: "fileType",
  initialState,
  reducers: {
    setFileType: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setFileType } = fileTypeSlice.actions;
export const fileTypeReducer = fileTypeSlice.reducer;
export const useFileType = () =>
  useSelector((state: RootState) => state.fileType.value);
