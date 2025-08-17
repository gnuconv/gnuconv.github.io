import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type RulesState = {
  rules?: Rule[];
  error?: string;
};

export type Rule = {
  match: string;
  desc: string;
  dest: string;
};

const badObject = (i: unknown): RulesState => {
  return {
    error: `Rule number ${i} (0 indexed) does not match object {match: string; desc: string; dest: string;}`,
  };
};

const fields: (keyof Rule)[] = ["match", "desc", "dest"];
const validateRules = (s: string): RulesState => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(s);
  } catch {
    return { error: "Rules are not valid json" };
  }

  if (!Array.isArray(parsed)) {
    return { error: "Rules is not an array" };
  }
  for (const i in parsed) {
    if (typeof parsed[i] !== "object") {
      return badObject(i);
    }
    for (const key of fields) {
      if (!(key in parsed[i])) return badObject(i);
      if (typeof parsed[i][key] !== "string") return badObject(i);
      if (parsed[i][key] === "")
        return {
          error: `Rule number ${i} (0 indexed) field ${key} cannot be empty string`,
        };
    }
  }
  return { rules: parsed as Rule[] };
};

const loadInitialRules = (): RulesState => {
  const rules = localStorage.getItem("RULES");
  if (rules === null || rules === "") return {};
  return validateRules(rules);
};

const saveRules = (s: string): void => {
  localStorage.setItem("RULES", s);
};

const initialState = loadInitialRules();

export const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    onRuleFileUpload: (state, action: PayloadAction<string>) => {
      const newState = validateRules(action.payload);
      state.rules = newState.rules;
      state.error = newState.error;
      if ((state.rules?.length ?? 0) > 0) {
        saveRules(action.payload);
      } else {
        saveRules("");
      }
    },
  },
});

export const { onRuleFileUpload } = rulesSlice.actions;

export const selectRules = (state: RootState): Rule[] | undefined =>
  state.rules.rules;
export const selectNumRules = (state: RootState): number =>
  state.rules.rules?.length ?? 0;
export const selectError = (state: RootState): string | undefined =>
  state.rules.error;
