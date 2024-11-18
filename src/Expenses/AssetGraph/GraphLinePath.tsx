import type { Graph, Line, Point } from "./graph";
import { computeX, computeY } from "./utils";

interface GraphLinePathProps {
  graph: Graph;
  line: Line;
  points: [Point, Point];
  extraSize: number;
  alpha: string;
}

const strokeWidth = 2;

export const GraphLinePath = ({
  graph,
  line,
  points,
  extraSize,
  alpha,
}: GraphLinePathProps): React.ReactElement => {
  const { dims, xMargins, xRange, yMargins, yRange } = graph;
  const x = computeX(dims, xMargins, xRange, points[0].date);
  const y = computeY(dims, yMargins, yRange, points[0].value);

  const x2 = computeX(dims, xMargins, xRange, points[1].date);
  const y2 = computeY(dims, yMargins, yRange, points[1].value);
  return (
    <path
      d={`M${x},${y} L${x2},${y2}`}
      strokeWidth={strokeWidth + extraSize}
      stroke={line.color + alpha}
    />
  );
};
