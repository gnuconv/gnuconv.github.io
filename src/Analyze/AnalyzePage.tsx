import { Box } from "@mui/material";
import { AssetPage } from "../AssetGraph/AssetPage";
import {
  selectGNUFileContent,
  selectHasGNUFile,
} from "../redux/slices/gnuFile";
import { processGNUFile } from "../Expenses/gnuProcessor";
import { ExpensesPage } from "../Expenses/ExpensesPage";
import { GNUFileSelector } from "../Expenses/gnuFileSelector";
import { useAppSelector } from "../redux/hooks";
import { AnalyzeHeader } from "./AnalyzeHeader";
import { AnalyzePageWrapper } from "./AnalyzePageWrapper";
import { AnalyzePage as AP } from "../redux/slices/analyzePage";

export const AnalyzePage = (): React.ReactElement => {
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
            <AnalyzeHeader />
          </Box>
          <Box sx={{ width: "100%" }}>
            <AnalyzePageWrapper page={AP.EXPENSES}>
              <ExpensesPage accounts={accounts} transactions={transactions} />
            </AnalyzePageWrapper>
            <AnalyzePageWrapper page={AP.ASSETS}>
              <AssetPage accounts={accounts} transactions={transactions} />
            </AnalyzePageWrapper>
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
