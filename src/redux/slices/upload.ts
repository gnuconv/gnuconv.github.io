import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface UploadState {
  value: string;
}

const initialState: UploadState = {
  value: "",
};

export const fileTypeSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setUpload: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUpload } = fileTypeSlice.actions;
export const uploadReducer = fileTypeSlice.reducer;
export const useUpload = () =>
  useSelector((state: RootState) => state.upload.value);
