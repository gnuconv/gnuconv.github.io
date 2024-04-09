import { Box, Tab, Tabs } from "@mui/material";
import { Converter } from "./Converter";
import { useState } from "react";
import { ExpensesPage } from "./ExpensesPage";

export interface transaction {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
}

enum TAB {
  CONVERT,
  EXPENSES,
}

export const App = () => {
  const [tab, setTab] = useState(TAB.CONVERT);
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100vw",
        }}
      >
        <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="fullWidth">
          <Tab label="convert" value={TAB.CONVERT} />
          <Tab label="expenses" value={TAB.EXPENSES} />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          overflow: "scroll",
        }}
      >
        {tab === TAB.CONVERT && <Converter />}
        {tab === TAB.EXPENSES && <ExpensesPage />}
      </Box>
    </Box>
  );
};
