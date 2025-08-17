import { Palette } from "../Expenses/colors";
import type { GNUAccount, GNUTransaction } from "../redux/slices/gnuFile";

interface Point {
  date: number;
  value: number;
}

export interface Account {
  name: string;
  color: string;
  points: Point[];
}

const computeAccountGraphPoint = (
  account: GNUAccount,
  transactions: GNUTransaction[],
  color: string
): Account => {
  transactions.sort((a, b) => a.date - b.date);
  const points: Point[] = [];
  let balance = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (
      t.splits[0].account !== account.id &&
      t.splits[1].account !== account.id
    )
      continue;
    const splitIndex = t.splits[0].account === account.id ? 0 : 1;
    balance += t.splits[splitIndex].value;
    if (transactions[i].date === transactions[i + 1]?.date) continue;
    points.push({
      date: t.date,
      value: balance,
    });
  }
  return {
    name: account.name,
    color: color,
    points: points,
  };
};

const computeNetWorthLine = (
  graphAccounts: GNUAccount[],
  transactions: GNUTransaction[]
): Account => {
  const all = transactions.filter((t) =>
    t.splits.some((s) => graphAccounts.some((a) => a.id === s.account))
  );
  let balance = 0;
  const points: Point[] = [];

  all.sort((a, b) => a.date - b.date);
  for (let i = 0; i < all.length; i++) {
    if (
      graphAccounts.some((a) => all[i].splits[0].account === a.id) &&
      !graphAccounts.some((a) => all[i].splits[1].account === a.id)
    ) {
      balance += all[i].splits[0].value;
    }
    if (
      graphAccounts.some((a) => all[i].splits[1].account === a.id) &&
      !graphAccounts.some((a) => all[i].splits[0].account === a.id)
    ) {
      balance += all[i].splits[1].value;
    }

    if (all[i].date === all[i + 1]?.date) continue;
    points.push({
      date: all[i].date,
      value: balance,
    });
  }
  return {
    name: "Net Worth",
    color: Palette[graphAccounts.length % Palette.length],
    points,
  };
};

export const processGNUData = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[]
): Account[] => {
  const graphAccounts = accounts
    .filter((a) => ["ASSET", "CREDIT"].includes(a.type))
    .filter((a) =>
      transactions.some((t) => t.splits.some((s) => s.account === a.id))
    );

  const lines = graphAccounts.map((a, i) =>
    computeAccountGraphPoint(a, transactions, Palette[i])
  );

  lines.push(computeNetWorthLine(graphAccounts, transactions));

  return lines;
};
