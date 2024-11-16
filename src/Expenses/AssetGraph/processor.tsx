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

  const lines = graphAccounts.map((a) =>
    computeAccountGraphPoint(a, transactions)
  );

  lines.forEach((l, i) => (l.color = Palette[i]));

  return lines;
};

const computeAccountGraphPoint = (
  account: GNUAccount,
  transactions: GNUTransaction[]
): Account => {
  const accountTransaction = transactions
    .filter(
      (t) =>
        t.splits[0].account === account?.id ||
        t.splits[1].account === account?.id
    )
    .sort((a, b) => a.date - b.date);

  let balance = 0;
  const subTransactions = accountTransaction.map((t) => {
    const index = t.splits[0].account === account?.id ? 0 : 1;
    balance += t.splits[index].value;
    return {
      date: t.date,
      value: balance,
    };
  });

  const points = [];

  for (let i = 0; i < subTransactions.length; i++) {
    if (subTransactions[i].date == subTransactions[i + 1]?.date) continue;
    points.push(subTransactions[i]);
  }

  return {
    name: account.name,
    color: "white",
    points: points,
  };
};
