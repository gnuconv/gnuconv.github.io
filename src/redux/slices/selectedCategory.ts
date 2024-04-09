import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface SelectedCategoryState {
  value: string[];
}

const initialState: SelectedCategoryState = {
  value: [],
};

export const selectedCategorySlice = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
    pushCategory: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    pushAllCategories: (state, action: PayloadAction<string[]>) => {
      state.value.push(...action.payload);
    },
    popCategory: (state) => {
      state.value.pop();
    },
    clearCategories: (state) => {
      state.value = [];
    },
  },
});

export const {
  setSelectedCategory,
  pushCategory,
  popCategory,
  clearCategories,
  pushAllCategories,
} = selectedCategorySlice.actions;
export const selectedCategoryReducer = selectedCategorySlice.reducer;
export const useSelectedCategory = () =>
  useSelector((state: RootState) => state.selectedCategory.value);
