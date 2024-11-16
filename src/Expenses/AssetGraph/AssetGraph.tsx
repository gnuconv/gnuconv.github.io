import { GNUAccount, GNUTransaction } from "../chartUtils";
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

interface AssetGraphProps {
  accounts: GNUAccount[];
  transactions: GNUTransaction[];
}

export const AssetGraph = ({ accounts, transactions }: AssetGraphProps) => {
  const allLines = useMemo(() => processGraphData(accounts, transactions), []);
  const [visibleAccounts, setVisibleAccounts] = useState(
    allLines.reduce((acc, c) => {
      acc[c.name] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const graphData = computeGraphMeta(allLines, visibleAccounts);
  const { dims, lines } = graphData;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <svg
        width={dims[0]}
        height={dims[1]}
        style={{ backgroundColor: "#121212" }}
      >
        <XAxis graph={graphData} />
        <YAxis graph={graphData} />
        <YLabels graph={graphData} />
        <XLabels graph={graphData} />
        {lines.map((l, i) => (
          <GraphLine key={i} graph={graphData} line={l} />
        ))}
      </svg>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {allLines.map((l, i) => (
          <LineToggle
            key={i}
            account={l}
            disabled={!visibleAccounts[l.name]}
            onClick={() =>
              setVisibleAccounts((visibleAccounts) => ({
                ...visibleAccounts,
                [l.name]: !visibleAccounts[l.name],
              }))
            }
          />
        ))}
      </Box>
    </Box>
  );
};
