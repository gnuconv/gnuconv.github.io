import { Box, Card, Tab, Tabs } from "@mui/material";
import { Converter } from "./Converter";
import { useState } from "react";
import { Chart } from "./Chart";

export interface transaction {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
}

enum TAB {
  CONVERT,
  CHART,
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
      <Box sx={{ width: "100vw" }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="fullWidth">
          <Tab label="Convert" value={TAB.CONVERT} />
          <Tab label="Chart" value={TAB.CHART} />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Card sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          {tab === TAB.CONVERT && <Converter />}
          {tab === TAB.CHART && <Chart />}
        </Card>
      </Box>
    </Box>
  );
};
