import { Fragment } from "react/jsx-runtime";
import { computeY } from "./utils";
import type { Graph } from "./graph";

interface YLabelsProps {
  graph: Graph;
}

const half = 0.5;
const textOffset = 5;

export const YLabels = ({ graph }: YLabelsProps): React.ReactElement => {
  const { dims, xMargins, yMargins, yRange, yLabels } = graph;
  return (
    <>
      {yLabels.map((a) => (
        <Fragment key={a}>
          <path
            stroke="white"
            strokeWidth={2}
            d={`M${xMargins[0] * dims[0]},${computeY(
              dims,
              yMargins,
              yRange,
              a
            )} L${dims[0] * xMargins[0] * half},${computeY(
              dims,
              yMargins,
              yRange,
              a
            )}`}
          />
          <text
            x={0}
            y={computeY(dims, yMargins, yRange, a) - textOffset}
            fill="white"
          >
            {a}
          </text>
        </Fragment>
      ))}
    </>
  );
};
