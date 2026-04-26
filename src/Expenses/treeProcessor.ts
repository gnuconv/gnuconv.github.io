import type { GNUAccount, GNUTransaction } from "../redux/slices/gnu";

export const calculateSize = (n: GraphNode | GraphNode[]): [number, number] => {
  if (Array.isArray(n))
    return n.reduce(
      (acc, c) => {
        const sub = calculateSize(c);
        return [acc[0] + sub[0], acc[1] + sub[1]];
      },
      [0, 0],
    );

  if (n.add || n.remove) return [n.add, n.remove];
  return (
    n.children?.reduce(
      (acc, c) => {
        const sub = calculateSize(c);
        return [acc[0] + sub[0], acc[1] + sub[1]];
      },
      [0, 0],
    ) ?? [0, 0]
  );
};

type AccountTreeTransaction = {
  name: string;
  value: number;
};

type AccountTreeNode = {
  account: GNUAccount;
  transactions?: AccountTreeTransaction[];
  children?: AccountTreeNode[];
};

const makeTreeNode = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[],
  start: number,
  end: number,
  account: GNUAccount,
): AccountTreeNode => {
  const children = accounts
    .filter((a) => a.parent === account.id)
    .map((a) => makeTreeNode(accounts, transactions, start, end, a));
  const out: AccountTreeNode = {
    account,
    children: children.length > 0 ? children : undefined,
    transactions: transactions
      .filter((t) => t.date >= start && t.date <= end)
      .filter((t) => t.splits.some((s) => s.account === account.id))
      .map((t) => ({
        name: t.description,
        value: t.splits.find((s) => s.account === account.id)?.value ?? 0,
      })),
  };

  return out;
};

export type GraphNode = {
  name: string;
  add: number;
  remove: number;
  children?: GraphNode[];
};

const convertAccountTree = (node: AccountTreeNode): GraphNode => {
  const out = {
    name: node.account.name,
    children: [] as GraphNode[],
    add: 0,
    remove: 0,
  };

  if (node.transactions) {
    out.children.push(
      ...node.transactions.map((t) => ({
        name: t.name,
        add: t.value > 0 ? t.value : 0,
        remove: t.value < 0 ? t.value : 0,
      })),
    );
  }

  if (node.children) {
    out.children.push(
      ...node.children.map(convertAccountTree).filter((c) => {
        const sub = calculateSize(c);
        return sub[0] > 0 || sub[1] > 0;
      }),
    );
    [out.add, out.remove] = calculateSize(out);
    return out;
  }

  [out.add, out.remove] = calculateSize(out);
  return out;
};

export const processTree = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[],
  start: number,
  end: number,
): GraphNode => {
  const expenses = accounts.find((a) =>
    ["Expenses", "Dépenses"].includes(a.name),
  );
  if (!expenses) throw new Error("no root Expenses node found");
  const accountTree = makeTreeNode(
    accounts,
    transactions,
    start,
    end,
    expenses,
  );

  return convertAccountTree(accountTree);
};
