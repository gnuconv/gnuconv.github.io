import dayjs from "dayjs";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface GNUAccount {
  name: string;
  type: string;
  id: string;
  parent: string;
}

export interface GNUTransaction {
  id: string;
  description: string;
  value: number;
  date: number;
  splits: GNUSplit[];
}

export interface GNUSplit {
  id: string;
  value: number;
  account: string;
}

export interface GNUFileState {
  filename: string;
  content: string;

  accounts?: GNUAccount[];
  transactions?: GNUTransaction[];
}

const initialState: GNUFileState = {
  filename: "",
  content: "",
};

export const getFirst = (
  e: Element | null | undefined,
  tag: string
): Element | null | undefined => {
  const elems = e?.getElementsByTagName(tag);
  return elems?.item(0);
};

export const ExtractAccounts = (doc: Document): GNUAccount[] => {
  const elems = doc.getElementsByTagName("gnc:account");
  const accounts = new Array<GNUAccount>(elems.length);
  for (let i = 0; i < elems.length; i++) {
    const e = elems.item(i);
    accounts[i] = {
      name: getFirst(e, "act:name")?.textContent ?? "",
      type: getFirst(e, "act:type")?.textContent ?? "",
      id: getFirst(e, "act:id")?.textContent ?? "",
      parent: getFirst(e, "act:parent")?.textContent ?? "",
    };
  }
  return accounts;
};

const calculate = (s: string): number => eval(s) as number;

export const ExtractSplits = (doc: Element | null): GNUSplit[] => {
  if (!doc) return [];
  const elems = doc.getElementsByTagName("trn:split");
  const splits = new Array<GNUSplit>(elems.length);
  for (let i = 0; i < elems.length; i++) {
    const s = elems.item(i);
    splits[i] = {
      id: getFirst(s, "split:id")?.textContent ?? "",
      value: calculate(getFirst(s, "split:value")?.textContent ?? "0"),
      account: getFirst(s, "split:account")?.textContent ?? "",
    };
  }
  return splits;
};

export const ExtractTransactions = (doc: Document): GNUTransaction[] => {
  const elems = doc.getElementsByTagName("gnc:transaction");
  const transactions = new Array<GNUTransaction>(elems.length);
  for (let i = 0; i < elems.length; i++) {
    const e = elems.item(i);
    transactions[i] = {
      id: getFirst(e, "trn:id")?.textContent ?? "",
      description: getFirst(e, "trn:description")?.textContent ?? "",
      value: calculate(
        getFirst(e, "trn:split")?.getAttribute("quantity") ?? "0"
      ),
      splits: ExtractSplits(e),
      date: dayjs(
        getFirst(getFirst(e, "trn:date-posted"), "ts:date")?.textContent
      ).unix(),
    };
  }
  return transactions;
};

export const processGNUFile = (
  content: string
): [GNUAccount[], GNUTransaction[]] => {
  if (!content) return [[], []];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(content, "text/xml");
  const accounts = ExtractAccounts(xmlDoc);
  const transactions = ExtractTransactions(xmlDoc);
  return [accounts, transactions];
};

export const gnuFileSlice = createSlice({
  name: "gnuFile",
  initialState,
  reducers: {
    onGNUFileUploaded: (state, action: PayloadAction<GNUFileState>) => {
      state.filename = action.payload.filename;
      state.content = action.payload.content;
      [state.accounts, state.transactions] = processGNUFile(state.content);
    },
  },
});

export const { onGNUFileUploaded } = gnuFileSlice.actions;
export const gnuFileReducer = gnuFileSlice.reducer;

export const selectGNUFileName = (state: RootState): string =>
  state.gnuFile.filename;
export const selectGNUFileContent = (state: RootState): string =>
  state.gnuFile.content;
export const selectHasGNUFile = (state: RootState): boolean =>
  state.gnuFile.filename !== "";
export const selectAccounts = (state: RootState): GNUAccount[] =>
  state.gnuFile.accounts ?? [];
export const selectTransactions = (state: RootState): GNUTransaction[] =>
  state.gnuFile.transactions ?? [];
