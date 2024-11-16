import { Box, Paper } from "@mui/material";
import { Timeframe } from "./Timeframe";
import { ExpensesChart } from "./ExpensesChart";
import type { GNUAccount, GNUTransaction } from "./chartUtils";
import { GNUFileSelector } from "./gnuFileSelector";
import React from "react";
interface ExpensesPageProps {
  accounts: GNUAccount[];
  transactions: GNUTransaction[];
}

export const ExpensesPage = ({
  accounts,
  transactions,
}: ExpensesPageProps): React.ReactElement => {
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
