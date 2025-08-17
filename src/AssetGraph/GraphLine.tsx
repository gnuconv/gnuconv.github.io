import type { Line } from "./graph";
import { computeX, computeY } from "./utils";
import { GraphLinePath } from "./GraphLinePath";
import { useGraph } from "./GraphContext";

type GraphLineProps = {
  line: Line;
  highlight: boolean;
  dim: boolean;
};

const circleRadius = 3;

export const GraphLine = ({
  line,
  highlight,
  dim,
}: GraphLineProps): React.ReactElement => {
  const { dims, xMargins, xRange, yMargins, yRange } = useGraph();

  const alpha = dim ? "AA" : "FF";
  const extraSize = highlight ? 2 : 0;
  let extraPath = <></>;

  if (line.points[line.points.length - 1].date !== xRange[1]) {
    const lastPoint = line.points[line.points.length - 1];
    extraPath = (
      <GraphLinePath
        line={line}
        points={[lastPoint, { date: xRange[1], value: lastPoint.value }]}
        extraSize={extraSize}
        alpha={alpha}
      />
    );
  }

  return (
    <>
      {line.points.map((p, i) => (
        <circle
          key={i}
          cx={computeX(dims, xMargins, xRange, p.date)}
          cy={computeY(dims, yMargins, yRange, p.value)}
          fill={line.color + alpha}
          r={circleRadius + extraSize}
        />
      ))}
      {line.points.slice(1).map((p, i) => (
        <GraphLinePath
          key={i}
          line={line}
          points={[p, line.points[i]]}
          extraSize={extraSize}
          alpha={alpha}
        />
      ))}
      {extraPath}
    </>
  );
};
