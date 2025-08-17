import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface PageState {
  value: Page;
}

export const Page = Object.freeze({
  CONVERT: "CONVERT",
  ANALYZE: "ANALYZE",
});

export type Page = keyof typeof Page;

const initialState: PageState = {
  value: Page.CONVERT,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    onPageChange: (state, action: PayloadAction<Page>) => {
      state.value = action.payload;
    },
  },
});

export const { onPageChange } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;

export const selectPage = (state: RootState): Page => state.page.value;
