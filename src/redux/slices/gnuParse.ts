import dayjs from "dayjs";
import type { GNUAccount, GNUSplit, GNUTransaction } from "./gnu";

const getFirst = (
  e: Element | null | undefined,
  tag: string
): Element | null | undefined => {
  const elems = e?.getElementsByTagName(tag);
  return elems?.item(0);
};

const extractAccounts = (doc: Document): GNUAccount[] => {
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

const extractSplits = (doc: Element | null): GNUSplit[] => {
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

const extractTransactions = (doc: Document): GNUTransaction[] => {
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
      splits: extractSplits(e),
      date: dayjs(
        getFirst(getFirst(e, "trn:date-posted"), "ts:date")?.textContent
      ).unix(),
    };
  }
  return transactions;
};

export const parseGNUFile = (
  content: string
): [GNUAccount[], GNUTransaction[]] => {
  if (!content) return [[], []];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(content, "text/xml");
  const accounts = extractAccounts(xmlDoc);
  const transactions = extractTransactions(xmlDoc);
  return [accounts, transactions];
};
