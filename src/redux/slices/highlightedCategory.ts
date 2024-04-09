import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface HighlightedCategoryState {
  value: string;
}

const initialState: HighlightedCategoryState = {
  value: "",
};

export const highlightedCategorySlice = createSlice({
  name: "highlightedCategory",
  initialState,
  reducers: {
    setHighlightedCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setHighlightedCategory } = highlightedCategorySlice.actions;
export const highlightedCategoryReducer = highlightedCategorySlice.reducer;
export const useHighlightedCategory = () =>
  useSelector((state: RootState) => state.highlightedCategory.value);
