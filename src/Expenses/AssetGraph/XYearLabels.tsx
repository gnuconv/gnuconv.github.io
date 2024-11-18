import dayjs from "dayjs";
import type { Graph } from "./graph";
import { computeX } from "./utils";
import { Fragment } from "react/jsx-runtime";

interface XYearLabelsProps {
  graph: Graph;
}

export const XYearLabels = ({
  graph,
}: XYearLabelsProps): React.ReactElement => {
  const { dims, xMargins, yMargins, xRange, xYearsLabels } = graph;
  const graphXMin = computeX(dims, xMargins, xRange, xRange[0]);
  const graphXMax = computeX(dims, xMargins, xRange, xRange[1]);

  const lineHeight = (dims[1] * yMargins[0]) / 2;

  const yearUnix = xYearsLabels.map((y) => dayjs(`${y}-01-01`).unix());
  yearUnix.push(
    dayjs(`${xYearsLabels[xYearsLabels.length - 1] + 1}-01-01`).unix()
  );
  return (
    <>
      <path d={`M${graphXMin},0 L${graphXMin},${lineHeight}`} stroke="white" />
      {xYearsLabels.map((y, i) => {
        const yearXMin = computeX(dims, xMargins, xRange, yearUnix[i]);
        const x0 = Math.max(graphXMin, yearXMin);

        const yearXMax = computeX(dims, xMargins, xRange, yearUnix[i + 1]);
        const x1 = Math.min(graphXMax, yearXMax);

        const mid = (x0 + x1) * 0.5;
        return (
          <Fragment key={i}>
            <text
              x={mid - 15}
              y={(dims[1] * yMargins[0]) / 3}
              fill="white"
              fontSize="20"
            >
              {y}
            </text>
            <path d={`M${x1},0 L${x1},${lineHeight}`} stroke="white" />
          </Fragment>
        );
      })}
    </>
  );
};
