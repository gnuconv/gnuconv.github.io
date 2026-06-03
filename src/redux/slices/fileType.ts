import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type FileTypeState = {
  value: FileType;
};

export const FileType = Object.freeze({
  ["DESJARDINS CREDIT"]: "DESJARDINS CREDIT",
  ["DESJARDINS"]: "DESJARDINS",
  ["RBC"]: "RBC",
  ["TD CC"]: "TD CC",
  ["TD CHECKING"]: "TD CHECKING",
});

export type FileType = keyof typeof FileType;

const initialState: FileTypeState = {
  value: FileType["DESJARDINS CREDIT"],
};

export const fileTypeSlice = createSlice({
  name: "fileType",
  initialState,
  reducers: {
    onFileTypeChange: (state, action: PayloadAction<FileType>) => {
      state.value = action.payload;
    },
  },
});

export const { onFileTypeChange } = fileTypeSlice.actions;

export const selectFileType = (state: RootState): FileType =>
  state.fileType.value;
