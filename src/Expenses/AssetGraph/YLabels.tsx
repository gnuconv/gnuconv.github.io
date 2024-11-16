import { Fragment } from "react/jsx-runtime";
import { computeY } from "./utils";
import { Graph } from "./graph";

interface YLabelsProps {
  graph: Graph;
}

export const YLabels = ({ graph }: YLabelsProps) => {
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
            )} L${dims[0] * xMargins[0] * 0.5},${computeY(
              dims,
              yMargins,
              yRange,
              a
            )}`}
          />
          <text x={0} y={computeY(dims, yMargins, yRange, a) - 5} fill="white">
            {a}
          </text>
        </Fragment>
      ))}
    </>
  );
};
