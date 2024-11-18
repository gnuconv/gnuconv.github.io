import { Fragment } from "react/jsx-runtime";

import dayjs from "dayjs";
import { computeX } from "./utils";
import type { Graph } from "./graph";

const monthNames = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

interface XLabelsProps {
  graph: Graph;
}

const monthPadding = 2;
const textOffset = 12;

export const XLabels = ({ graph }: XLabelsProps): React.ReactElement => {
  const { dims, xMargins, yMargins, xRange, xYearsLabels, xMonthslabels } =
    graph;
  return (
    <>
      {xYearsLabels.map((y, i) => {
        const min = computeX(dims, xMargins, xRange, xRange[0]);
        const start = computeX(
          dims,
          xMargins,
          xRange,
          dayjs(`${y}-01-01`).unix()
        );

        const x0 = Math.max(min, start);
        let prev = <></>;
        if (i === 0) {
          prev = <path d={`M${x0},0 L${x0},30`} stroke="white" />;
        }

        const max = computeX(dims, xMargins, xRange, xRange[1]);
        const end = computeX(
          dims,
          xMargins,
          xRange,
          dayjs(`${y + 1}-01-01`).unix()
        );
        const x1 = Math.min(max, end);

        const mid = (x0 + x1) * 0.5;
        return (
          <Fragment key={i}>
            {prev}
            <text
              x={mid - 15}
              y={(dims[1] * yMargins[0]) / 3}
              fill="white"
              fontSize="20"
            >
              {y}
            </text>
            <path d={`M${x1},0 L${x1},30`} stroke="white" />
          </Fragment>
        );
      })}
      {xMonthslabels.map((m, i) => {
        const min = computeX(dims, xMargins, xRange, xRange[0]);
        const max = computeX(dims, xMargins, xRange, xRange[1]);

        const monthStart = dayjs(
          `${m[0]}-${(m[1] + 1 + "").padStart(monthPadding, "0")}`
        );
        const x0 = Math.max(
          min,
          computeX(dims, xMargins, xRange, monthStart.unix())
        );

        const monthEnd = monthStart.add(1, "month");
        const x1 = Math.min(
          max,
          computeX(dims, xMargins, xRange, monthEnd.unix())
        );

        const mid = (x0 + x1) * 0.5;
        return (
          <text
            key={i}
            x={mid - textOffset}
            fill="white"
            y={dims[1] * yMargins[0] - 10}
          >
            {monthNames[m[1]]}
          </text>
        );
      })}
    </>
  );
};
