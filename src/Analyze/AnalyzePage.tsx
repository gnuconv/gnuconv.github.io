import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AssetPage } from "../AssetGraph/AssetPage";
import {
  selectGNUFileContent,
  selectHasGNUFile,
} from "../redux/slices/gnuFile";
import { processGNUFile } from "../Expenses/gnuProcessor";
import { ExpensesPage } from "../Expenses/ExpensesPage";
import { GNUFileSelector } from "../Expenses/gnuFileSelector";
import { Tab as TTab } from "../Tab";
import { useAppSelector } from "../redux/hooks";

export const AnalyzePage = (): React.ReactElement => {
  const [tab, setTab] = useState<TTab>(TTab.EXPENSES);
  const hasGNUFile = useAppSelector(selectHasGNUFile);
  const filecontent = useAppSelector(selectGNUFileContent);
  const [accounts, transactions] = processGNUFile(filecontent);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {hasGNUFile ? (
        <>
          <Box
            sx={{
              width: "100vw",
            }}
          >
            <Tabs
              value={tab}
              onChange={(_e, v) => {
                setTab(v as TTab);
              }}
              variant="fullWidth"
            >
              <Tab label={TTab.EXPENSES} value={TTab.EXPENSES} />
              <Tab label={TTab.ASSETS} value={TTab.ASSETS} />
            </Tabs>
          </Box>
          <Box sx={{ width: "100%" }}>
            {tab === TTab.EXPENSES && (
              <ExpensesPage accounts={accounts} transactions={transactions} />
            )}
            {tab === TTab.ASSETS && (
              <AssetPage accounts={accounts} transactions={transactions} />
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
