import type { Graph } from "./graph";
import { GraphContext } from "./GraphContext";
import { GraphLine } from "./GraphLine";
import { Grid } from "./Grid";
import { XAxis } from "./XAxis";
import { XMonthLabels } from "./XMonthLabels";
import { XYearLabels } from "./XYearLabels";
import { YAxis } from "./YAxis";
import { YLabels } from "./YLabels";

type AssetGraphProps = {
  graph: Graph;
  highlight: string;
};

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
      <svg style={{ maxHeight: "700px" }} viewBox={`0 0 ${dims[0]} ${dims[1]}`}>
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
