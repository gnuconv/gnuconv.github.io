import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AssetGraph } from "../Expenses/AssetGraph/AssetGraph";
import { useTimeframe } from "../redux/slices/timeframe";
import { useGNUFile } from "../redux/slices/gnuFile";
import { processGNUFile } from "../Expenses/gnuProcessor";
import { ExpensesPage } from "../Expenses/ExpensesPage";
import { GNUFileSelector } from "../Expenses/gnuFileSelector";

enum TAB {
  EXPENSES = "EXPENSES",
  ASSETS = "ASSETS",
}

export const AnalyzePage = () => {
  const [tab, setTab] = useState(TAB.ASSETS);
  const gnuFile = useGNUFile();
  const [accounts, transactions] = processGNUFile(gnuFile.content);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {gnuFile.filename ? (
        <>
          <Box
            sx={{
              width: "100vw",
            }}
          >
            <Tabs
              value={tab}
              onChange={(_e, v) => setTab(v)}
              variant="fullWidth"
            >
              <Tab label={TAB.EXPENSES} value={TAB.EXPENSES} />
              <Tab label={TAB.ASSETS} value={TAB.ASSETS} />
            </Tabs>
          </Box>
          <Box sx={{ width: "100%" }}>
            {tab === TAB.EXPENSES && (
              <ExpensesPage accounts={accounts} transactions={transactions} />
            )}
            {tab === TAB.ASSETS && (
              <AssetGraph accounts={accounts} transactions={transactions} />
            )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <GNUFileSelector />
        </Box>
      )}
    </Box>
  );
};
