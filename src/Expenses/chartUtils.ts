import dayjs from "dayjs";

export interface GNUAccount {
  name: string;
  type: string;
  id: string;
  parent: string;
}

export const getFirst = (
  e: Element | null | undefined,
  tag: string
): Element | null | undefined => {
  const elems = e?.getElementsByTagName(tag);
  return elems?.item(0);
};

export const ExtractAccounts = (doc: Document): GNUAccount[] => {
  const elems = doc.getElementsByTagName("gnc:account");
  const accounts = new Array(elems.length);
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

export interface GNUSplit {
  id: string;
  value: number;
  account: string;
}

export interface GNUTransaction {
  id: string;
  description: string;
  value: number;
  date: number;
  splits: GNUSplit[];
}

const calculate = (s: string): number => eval(s); // eslint-disable-line no-eval

export const ExtractSplits = (doc: Element | null): GNUSplit[] => {
  if (!doc) return [];
  const elems = doc.getElementsByTagName("trn:split");
  const splits = new Array(elems.length);
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
  const transactions: GNUTransaction[] = new Array(elems.length);
  for (let i = 0; i < elems.length; i++) {
    const e = elems.item(i);
    transactions[i] = {
      id: getFirst(e, "trn:id")?.textContent ?? "",
      description: getFirst(e, "trn:description")?.textContent ?? "",
      value: calculate(
        getFirst(e, "trn:split")?.getAttribute("quantity") ?? "0"
      ),
      splits: ExtractSplits(e),
      date:
        dayjs(
          getFirst(getFirst(e, "trn:date-posted"), "ts:date")?.textContent
        ).unix() ?? 0,
    };
  }
  return transactions;
};
