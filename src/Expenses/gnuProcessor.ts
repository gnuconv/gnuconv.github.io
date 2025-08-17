import type { GNUAccount, GNUTransaction } from "../redux/slices/gnuFile";

export const calculateSize = (n: GraphNode | GraphNode[]): number => {
  if (Array.isArray(n)) return n.reduce((acc, c) => acc + calculateSize(c), 0);

  if (n.size) return n.size;
  return n.children.reduce((acc, c) => acc + calculateSize(c), 0);
};

interface AccountTreeTransaction {
  name: string;
  value: number;
}

interface AccountTreeNode {
  account: GNUAccount;
  transactions?: AccountTreeTransaction[];
  children?: AccountTreeNode[];
}

const makeTreeNode = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[],
  start: number,
  end: number,
  account: GNUAccount
): AccountTreeNode => {
  const children = accounts
    .filter((a) => a.parent === account.id)
    .map((a) => makeTreeNode(accounts, transactions, start, end, a));
  if (children.length > 0) {
    return {
      account,
      children: children,
    };
  }

  transactions.reduce((acc, t) => {
    const split = t.splits.find((s) => s.account === account.id);
    if (split && t.date >= start && t.date <= end && split.value > 0) {
      return acc + split.value;
    }
    return acc;
  }, 0);

  return {
    account,
    transactions: transactions
      .filter((t) => t.date >= start && t.date <= end)
      .filter((t) => t.splits.some((s) => s.account === account.id))
      .map((t) => ({
        name: t.description,
        value: t.splits.find((s) => s.account === account.id)?.value ?? 0,
      })),
  };
};

const bitShift = 5;
const numColorComponents = 3;
const base16 = 16;
const hexComponentColorLength = 2;
const colorMask = 0xff;
const colorIncrement = 8;
const stringToColour = (str: string): string => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << bitShift) - hash);
  });
  let colour = "#";
  for (let i = 0; i < numColorComponents; i++) {
    const value = (hash >> (i * colorIncrement)) & colorMask;
    colour += value.toString(base16).padStart(hexComponentColorLength, "0");
  }
  return colour;
};

export interface GraphNode {
  name: string;
  color: string;
  size: number;
  children: GraphNode[];
}

const convertAccountTree = (node: AccountTreeNode): GraphNode => {
  if (node.transactions) {
    const out = {
      name: node.account.name,
      color: stringToColour(node.account.name),
      children: node.transactions.map((t) => ({
        name: t.name,
        size: t.value,
        color: stringToColour(t.name),
        children: [],
      })),
      size: 0,
    };
    out.size = calculateSize(out);
    return out;
  }
  if (node.children) {
    const out = {
      name: node.account.name,
      color: stringToColour(node.account.name),
      children: node.children
        .map(convertAccountTree)
        .filter((c) => calculateSize(c) > 0),
      size: 0,
    };
    out.size = calculateSize(out);
    return out;
  }
  return {
    name: "",
    color: "",
    size: 0,
    children: [],
  };
};

export const processChart = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[],
  start: number,
  end: number
): GraphNode => {
  const expenses = accounts.find((a) => a.name === "Expenses");
  if (!expenses) throw new Error("no root Expenses node found");
  const accountTree = makeTreeNode(
    accounts,
    transactions,
    start,
    end,
    expenses
  );

  const out = convertAccountTree(accountTree);
  out.children = out.children.filter((c) => !c.name.includes("UNKNOWN"));
  return out;
};
