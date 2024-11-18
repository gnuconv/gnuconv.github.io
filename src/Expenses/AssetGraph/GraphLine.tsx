import { Fragment } from "react/jsx-runtime";
import type { Graph, Line } from "./graph";
import { computeX, computeY } from "./utils";
import { GraphLinePath } from "./GraphLinePath";

interface GraphLineProps {
  graph: Graph;
  line: Line;
  highlight: boolean;
  dim: boolean;
}

const circleRadius = 3;

export const GraphLine = ({
  graph,
  line,
  highlight,
  dim,
}: GraphLineProps): React.ReactElement => {
  const { dims, xMargins, xRange, yMargins, yRange } = graph;

  const alpha = dim ? "AA" : "FF";
  const extraSize = highlight ? 1 : 0;
  let extraPath = <></>;

  if (line.points[line.points.length - 1].date !== xRange[1]) {
    const lastPoint = line.points[line.points.length - 1];
    extraPath = (
      <GraphLinePath
        graph={graph}
        line={line}
        points={[lastPoint, { date: xRange[1], value: lastPoint.value }]}
        extraSize={extraSize}
        alpha={alpha}
      />
    );
  }

  return (
    <>
      {line.points.map((p, i) => {
        const x = computeX(dims, xMargins, xRange, p.date);
        const y = computeY(dims, yMargins, yRange, p.value);
        return (
          <Fragment key={line.name + i}>
            <circle
              cx={x}
              cy={y}
              fill={line.color + alpha}
              r={circleRadius + extraSize}
            />
            {i > 0 && (
              <GraphLinePath
                graph={graph}
                line={line}
                points={[p, line.points[i - 1]]}
                extraSize={extraSize}
                alpha={alpha}
              />
            )}
          </Fragment>
        );
      })}
      {extraPath}
    </>
  );
};
