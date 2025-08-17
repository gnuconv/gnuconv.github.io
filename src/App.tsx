import { Box } from "@mui/material";
import { Converter } from "./Converter/Converter";
import { AnalyzePage } from "./Analyze/AnalyzePage";
import { PageWrapper } from "./PageWrapper";
import { Page } from "./redux/slices/page";
import { Header } from "./Header";

export const App = (): React.ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100vw" }}>
        <Header />
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
        <PageWrapper page={Page.CONVERT}>
          <Converter />
        </PageWrapper>
        <PageWrapper page={Page.ANALYZE}>
          <AnalyzePage />
        </PageWrapper>
      </Box>
    </Box>
  );
};
