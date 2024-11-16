import { GNUAccount, GNUTransaction } from "../chartUtils";
import { Palette } from "../colors";

interface Point {
  date: number;
  value: number;
}

export interface Account {
  name: string;
  color: string;
  points: Point[];
}

export const processGraphData = (
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

  return lines;
};

const computeAccountGraphPoint = (
  account: GNUAccount,
  transactions: GNUTransaction[],
  color: string
): Account => {
  transactions.sort((a, b) => a.date - b.date);
  const points: Point[] = [];
  let balance = 0;
  // This algorithm is slow so we're writing it to be faster.
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (
      t.splits[0].account !== account.id &&
      t.splits[1].account !== account.id
    )
      continue;
    const splitIndex = t.splits[0].account === account?.id ? 0 : 1;
    balance += t.splits[splitIndex].value;
    if (transactions[i].date == transactions[i + 1]?.date) continue;
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
