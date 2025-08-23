import { DownloadButton } from "./DownloadButton";
import { processors } from "./processors";
import { useAppSelector } from "../redux/hooks";
import type { Transaction } from "./InputFile";
import { selectFileType } from "../redux/slices/fileType";
import { selectRules } from "../redux/slices/rules";
import { selectTransactionFileContent } from "../redux/slices/transactionsFileContent";

export const ProcessFiles = (): React.ReactElement => {
  const upload = useAppSelector(selectTransactionFileContent);
  const rules = useAppSelector(selectRules);
  const fileType = useAppSelector(selectFileType);
  if (!upload || !rules || rules.length === 0) return <></>;

  // process file
  let transactions: Transaction[] = [];
  try {
    transactions = processors[fileType](upload);
  } catch (err) {
    console.error(err);
    return (
      <>
        There was an error processing the file. Check the console for more
        details.
      </>
    );
  }

  // Remove DELETE/DELETE transactions
  transactions = transactions.filter(
    (t) =>
      !rules.some((r) => {
        const re = new RegExp(r.match, "g");
        return (
          t.description.match(re) && r.dest === "DELETE" && r.desc === "DELETE"
        );
      })
  );

  // transform transactions
  for (const t of transactions) {
    rules.forEach((rule) => {
      const re = new RegExp(rule.match, "g");
      if (t.description.match(re)) {
        t.destination = rule.dest;
        t.description = rule.desc;
      }
    });
  }

  const accounts = Array.from(
    transactions.reduce((p, c) => p.add(c.account), new Set<string>())
  );

  const files = accounts.map((a) => ({
    AccountName: a,
    Transactions: transactions.filter((t) => t.account === a),
  }));

  return (
    <>
      {files.map((f) => (
        <DownloadButton
          key={f.AccountName}
          AccountName={f.AccountName}
          Transactions={f.Transactions}
        />
      ))}
    </>
  );
};
