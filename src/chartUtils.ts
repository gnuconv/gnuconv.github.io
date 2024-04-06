import dayjs from "dayjs";

export interface GNUAccount {
  name: string;
  type: string;
  id: string;
  parent: string;
}

export const getFirst = (e: Element, tag: string) => {
  return Array.from(e.getElementsByTagName(tag))[0];
};

export const ExtractAccounts = (doc: Document) => {
  const elements = doc.getElementsByTagName("gnc:account");
  return Array.from(elements).map((e) => ({
    name: getFirst(e, "act:name")?.textContent ?? "",
    type: getFirst(e, "act:type")?.textContent ?? "",
    id: getFirst(e, "act:id")?.textContent ?? "",
    parent: getFirst(e, "act:parent")?.textContent ?? "",
  }));
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

export const ExtractSplits = (doc: Element) => {
  return Array.from(doc.getElementsByTagName("trn:split")).map((s) => ({
    id: getFirst(s, "split:id")?.textContent ?? "",
    value: calculate(getFirst(s, "split:value").textContent ?? "0"),
    account: getFirst(s, "split:account")?.textContent ?? "",
  }));
};

export const ExtractTransactions = (doc: Document): GNUTransaction[] => {
  const elements = doc.getElementsByTagName("gnc:transaction");
  return Array.from(elements).map((e) => ({
    id: getFirst(e, "trn:id")?.textContent ?? "",
    description: getFirst(e, "trn:description")?.textContent ?? "",
    value: calculate(getFirst(e, "trn:split").getAttribute("quantity") ?? "0"),
    splits: ExtractSplits(e),
    date:
      dayjs(
        getFirst(getFirst(e, "trn:date-posted"), "ts:date").textContent
      ).unix() ?? 0,
  }));
};
