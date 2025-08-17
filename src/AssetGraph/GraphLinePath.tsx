import type { Line, Point } from "./graph";
import { useGraph } from "./GraphContext";
import { computeX, computeY } from "./utils";

type GraphLinePathProps = {
  line: Line;
  points: [Point, Point];
  extraSize: number;
  alpha: string;
};

const strokeWidth = 2;

export const GraphLinePath = ({
  line,
  points,
  extraSize,
  alpha,
}: GraphLinePathProps): React.ReactElement => {
  const { dims, xMargins, xRange, yMargins, yRange } = useGraph();
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
