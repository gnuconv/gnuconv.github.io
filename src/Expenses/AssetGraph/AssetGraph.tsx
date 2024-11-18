import type { Graph } from "./graph";
import { GraphContext } from "./GraphContext";
import { GraphLine } from "./GraphLine";
import { Grid } from "./Grid";
import { XAxis } from "./XAxis";
import { XMonthLabels } from "./XMonthLabels";
import { XYearLabels } from "./XYearLabels";
import { YAxis } from "./YAxis";
import { YLabels } from "./YLabels";

interface AssetGraphProps {
  graph: Graph;
  highlight: string;
}

export const AssetGraph = ({
  graph,
  highlight,
}: AssetGraphProps): React.ReactElement => {
  const { dims, lines } = graph;

  const renderLines = lines
    .slice()
    .sort(
      (a, b) => (a.name === highlight ? 1 : 0) - (b.name === highlight ? 1 : 0)
    );
  return (
    <GraphContext.Provider value={graph}>
      <svg
        width={dims[0]}
        height={dims[1]}
        style={{ backgroundColor: "#121212" }}
      >
        <Grid />
        <XAxis />
        <YAxis />
        <YLabels />
        <XYearLabels />
        <XMonthLabels />
        {renderLines.map((l, i) => (
          <GraphLine
            key={i}
            line={l}
            highlight={highlight === l.name}
            dim={highlight !== "" && highlight !== l.name}
          />
        ))}
      </svg>
    </GraphContext.Provider>
  );
};
