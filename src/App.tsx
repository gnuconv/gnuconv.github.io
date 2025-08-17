import { Box } from "@mui/material";
import { Converter } from "./Converter/Converter";
import { AnalyzePage } from "./Analyze/AnalyzePage";
import { PageWrapper } from "./PageWrapper";
import { Page } from "./redux/slices/page";
import { Header } from "./Header";

const pages: [Page, () => React.ReactElement][] = [
  [Page.CONVERT, Converter],
  [Page.ANALYZE, AnalyzePage],
];

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
        {pages.map((p) => (
          <PageWrapper key={p[0]} page={p[0]}>
            {p[1]()}
          </PageWrapper>
        ))}
      </Box>
    </Box>
  );
};
