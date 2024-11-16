import { Graph, Line, Point } from "./graph";
import { computeX, computeY } from "./utils";

interface GraphLinePathProps {
  graph: Graph;
  line: Line;
  points: [Point, Point];
  extraSize: number;
}

export const GraphLinePath = ({
  graph,
  line,
  points,
  extraSize,
}: GraphLinePathProps) => {
  const { dims, xMargins, xRange, yMargins, yRange } = graph;
  const x = computeX(dims, xMargins, xRange, points[0].date);
  const y = computeY(dims, yMargins, yRange, points[0].value);

  const x2 = computeX(dims, xMargins, xRange, points[1].date);
  const y2 = computeY(dims, yMargins, yRange, points[1].value);
  return (
    <path
      d={`M${x},${y} L${x2},${y2}`}
      strokeWidth={2 + extraSize}
      stroke={line.color}
    />
  );
};
