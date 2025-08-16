import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Transaction } from "./InputFile";

type UnknownTransactionsProps = {
  transactions: Transaction[];
};
export const UnknownTransactions = ({
  transactions,
}: UnknownTransactionsProps): React.ReactElement => {
  if (transactions.length === 0) return <></>;

  return (
    <>
      <Typography>
        But there are {transactions.length} unknown transactions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t, i) => (
            <TableRow key={i}>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
