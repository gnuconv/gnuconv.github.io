import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type HighlightedCategoryState = {
  value: string;
};

const initialState: HighlightedCategoryState = {
  value: "",
};

export const highlightedCategorySlice = createSlice({
  name: "highlightedCategory",
  initialState,
  reducers: {
    onHighlightedCategoryChange: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { onHighlightedCategoryChange } = highlightedCategorySlice.actions;
export const selectHighlightedCategory = (state: RootState): string =>
  state.highlightedCategory.value;
