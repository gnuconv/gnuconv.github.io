import { Box } from "@mui/material";
import { AssetPage } from "../AssetGraph/AssetPage";
import { ExpensesPage } from "../Expenses/ExpensesPage";
import { AnalyzeHeader } from "./AnalyzeHeader";
import { AnalyzePageWrapper } from "./AnalyzePageWrapper";
import { AnalyzePage as AP } from "../redux/slices/analyzePage";
import { SelectFileGuard } from "./SelectFileGuard";

export const AnalyzePage = (): React.ReactElement => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SelectFileGuard>
        <Box sx={{ width: "100vw" }}>
          <AnalyzeHeader />
        </Box>
        <Box sx={{ width: "100%" }}>
          <AnalyzePageWrapper page={AP.EXPENSES}>
            <ExpensesPage />
          </AnalyzePageWrapper>
          <AnalyzePageWrapper page={AP.ASSETS}>
            <AssetPage />
          </AnalyzePageWrapper>
        </Box>
      </SelectFileGuard>
    </Box>
  );
};
