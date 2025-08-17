import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface FileTypeState {
  value: FileType;
}

export const FileType = Object.freeze({
  ["TD CC"]: "TD CC",
  ["TD CHECKING"]: "TD CHECKING",
  ["RBC"]: "RBC",
  ["DESJARDINS"]: "DESJARDINS",
});

export type FileType = keyof typeof FileType;

const initialState: FileTypeState = {
  value: FileType["TD CHECKING"],
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
