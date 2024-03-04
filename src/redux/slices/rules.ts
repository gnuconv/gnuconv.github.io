import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface RulesState {
  value?: Rule[];
}

export interface Rule {
  match: string;
  desc: string;
  dest: string;
}

const loadInitialRules = () => {
  const rules = localStorage.getItem("RULES");
  if (!rules) return undefined;
  try {
    return JSON.parse(rules);
  } catch (err) {
    return undefined;
  }
};

const initialState: RulesState = {
  value: loadInitialRules(),
};

export const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setRules: (state, action: PayloadAction<Rule[] | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const { setRules } = rulesSlice.actions;
export const rulesReducer = rulesSlice.reducer;
export const useRules = () =>
  useSelector((state: RootState) => state.rules.value);
