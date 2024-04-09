import {
  ExtractAccounts,
  ExtractTransactions,
  GNUAccount,
  GNUTransaction,
} from "./chartUtils";

export const calculateSize = (n: GraphNode | GraphNode[]): number => {
  if (Array.isArray(n)) return n.reduce((acc, c) => acc + calculateSize(c), 0);

  if (n.size) return n.size;
  if (n.children)
    return n.children.reduce((acc, c) => acc + calculateSize(c), 0);
  return 0;
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
        value: t.splits.find((s) => s.account === account.id)!.value,
      })),
  };
};

const stringToColour = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};

export interface GraphNode {
  name: string;
  color: string;
  size: number;
  children?: GraphNode[];
}

const convertAccountTree = (node: AccountTreeNode): GraphNode => {
  if (node.transactions) {
    const out = {
      name: `${node.account.name}`,
      color: stringToColour(node.account.name),
      children: node.transactions.map((t) => ({
        name: t.name,
        size: t.value,
        color: stringToColour(t.name),
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
  console.log("WRONG");
  return {
    name: "",
    color: "",
    size: 0,
  };
};

export const processChart = (data: string, start: number, end: number) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const accounts = ExtractAccounts(xmlDoc);
  const transactions = ExtractTransactions(xmlDoc);

  const expenses = accounts.find((a) => a.name === "Expenses")!;
  const accountTree = makeTreeNode(
    accounts,
    transactions,
    start,
    end,
    expenses
  );

  const out = convertAccountTree(accountTree);
  if (out.children)
    out.children = out.children.filter((c: any) => !c.name.includes("UNKNOWN"));
  return out;
};
