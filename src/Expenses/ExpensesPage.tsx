import { Box, Paper } from "@mui/material";
import { Timeframe } from "./Timeframe";
import { ExpensesChart } from "./ExpensesChart";
import { GNUFileSelector } from "./GNUFileSelect";
import React from "react";

export const ExpensesPage = (): React.ReactElement => {
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
        <ExpensesChart />
      </Box>
    </Box>
  );
};
