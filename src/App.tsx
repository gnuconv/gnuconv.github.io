import { Box, Tab, Tabs } from "@mui/material";
import { Converter } from "./Converter/Converter";
import { useState } from "react";
import { AnalyzePage } from "./Analyze/AnalyzePage";

const TAB = Object.freeze({
  CONVERT: "CONVERT",
  ANALYZE: "ANALYZE",
});

type TAB = keyof typeof TAB;

export const App = (): React.ReactElement => {
  const [tab, setTab] = useState<TAB>(TAB.CONVERT);
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
        <Tabs
          value={tab}
          onChange={(_e, v) => {
            setTab(v as TAB);
          }}
          variant="fullWidth"
        >
          <Tab label={TAB.CONVERT} value={TAB.CONVERT} />
          <Tab label={TAB.ANALYZE} value={TAB.ANALYZE} />
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
        {tab === TAB.ANALYZE && <AnalyzePage />}
      </Box>
    </Box>
  );
};
