import type { GNUAccount, GNUTransaction } from "../chartUtils";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";

import { LineToggle } from "./LineToggle";
import { processGraphData } from "./processor";
import { computeGraph } from "./graph";
import { GNUFileSelector } from "../gnuFileSelector";
import { AssetGraph } from "./AssetGraph";

interface AssetGraphProps {
  accounts: GNUAccount[];
  transactions: GNUTransaction[];
}

export const AssetPage = ({
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

  const graphData = computeGraph(allLines, visibleAccounts);

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
            onMouseEnter={() => {
              setHighlight(l.name);
            }}
            onMouseLeave={() => {
              setHighlight("");
            }}
          />
        ))}
      </Box>
      <AssetGraph graph={graphData} highlight={highlight} />
    </Box>
  );
};
