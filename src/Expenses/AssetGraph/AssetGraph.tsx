import type { GNUAccount, GNUTransaction } from "../chartUtils";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";

import { LineToggle } from "./LineToggle";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";
import { YLabels } from "./YLabels";
import { XLabels } from "./XLabels";
import { processGraphData } from "./processor";
import { computeGraphMeta } from "./graph";
import { GraphLine } from "./GraphLine";
import { GNUFileSelector } from "../gnuFileSelector";
import { Grid } from "./Grid";

interface AssetGraphProps {
  accounts: GNUAccount[];
  transactions: GNUTransaction[];
}

export const AssetGraph = ({
  accounts,
  transactions,
}: AssetGraphProps): React.ReactElement => {
  const allLines = useMemo(
    () => processGraphData(accounts, transactions),
    [accounts, transactions]
  );
  const [visibleAccounts, setVisibleAccounts] = useState(
    allLines.reduce<Record<string, boolean>>((acc, c) => {
      acc[c.name] = true;
      return acc;
    }, {})
  );
  const [highlight, setHighlight] = useState("");

  const graphData = computeGraphMeta(allLines, visibleAccounts);
  const { dims, lines } = graphData;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          flexDirection: "column",
          mr: 2,
        }}
      >
        <GNUFileSelector />
        {allLines.map((l, i) => (
          <LineToggle
            key={i}
            account={l}
            disabled={!visibleAccounts[l.name]}
            onClick={() => {
              setVisibleAccounts((va) => ({
                ...va,
                [l.name]: !va[l.name],
              }));
            }}
            onEnter={() => {
              setHighlight(l.name);
            }}
            onLeave={() => {
              setHighlight("");
            }}
          />
        ))}
      </Box>
      <svg
        width={dims[0]}
        height={dims[1]}
        style={{ backgroundColor: "#121212" }}
      >
        <Grid graph={graphData} />
        <YAxis graph={graphData} />
        <YLabels graph={graphData} />
        <XLabels graph={graphData} />
        <XAxis graph={graphData} />
        {lines.map((l, i) => (
          <GraphLine
            key={i}
            graph={graphData}
            line={l}
            highlight={highlight === l.name}
            dim={highlight !== "" && highlight !== l.name}
          />
        ))}
      </svg>
    </Box>
  );
};
