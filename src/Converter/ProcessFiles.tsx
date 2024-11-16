import { DownloadButton } from "./DownloadButton";
import { processors } from "./processors";
import { useFileType } from "../redux/slices/fileType";
import { useRules } from "../redux/slices/rules";
import { useTransactionsFileContent } from "../redux/slices/transactionsFileContent";

export const ProcessFiles = (): React.ReactElement => {
  const upload = useTransactionsFileContent();
  const rules = useRules();
  const fileType = useFileType();
  if (!upload || !rules) return <></>;

  // process file
  const transactions = processors[fileType](upload);

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
