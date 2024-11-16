import type { Graph } from "./graph";
import { computeY } from "./utils";

interface YAxisProps {
  graph: Graph;
}

export const YAxis = ({ graph }: YAxisProps): React.ReactElement => {
  const { dims, xMargins, yMargins, yRange } = graph;
  return (
    <path
      stroke="white"
      strokeWidth={2}
      d={`M${xMargins[0] * dims[0]},${computeY(
        dims,
        yMargins,
        yRange,
        yRange[0]
      )} L${xMargins[0] * dims[0]},${computeY(
        dims,
        yMargins,
        yRange,
        yRange[1]
      )}`}
    />
  );
};
