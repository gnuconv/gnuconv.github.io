import { Box, Paper } from "@mui/material";
import { Timeframe } from "./Timeframe";
import { ExpensesChart } from "./ExpensesChart";
import { GNUAccount, GNUTransaction } from "./chartUtils";
import { GNUFileSelector } from "./gnuFileSelector";
interface ExpensesPageProps {
  accounts: GNUAccount[];
  transactions: GNUTransaction[];
}

export const ExpensesPage = ({ accounts, transactions }: ExpensesPageProps) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          m: 4,
          p: 2,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <GNUFileSelector />
        <Timeframe />
      </Paper>
      <Box sx={{ width: "100%" }}>
        <ExpensesChart accounts={accounts} transactions={transactions} />
      </Box>
    </Box>
  );
};
