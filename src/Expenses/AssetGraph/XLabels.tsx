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

const half = 0.5;
const monthPadding = 2;
const textOffset = 12;

export const XLabels = ({ graph }: XLabelsProps): React.ReactElement => {
  const { dims, xMargins, xRange, xYearsLabels, xMonthslabels } = graph;
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
          prev = <path d={`M${x0},0 L${x0},15`} stroke="white" />;
        }

        const max = computeX(dims, xMargins, xRange, xRange[1]);
        const end = computeX(
          dims,
          xMargins,
          xRange,
          dayjs(`${y + 1}-01-01`).unix()
        );
        const x1 = Math.min(max, end);

        const mid = (x0 + x1) * half;
        return (
          <Fragment key={i}>
            {prev}
            <text x={mid} y={15} fill="white">
              {y}
            </text>
            <path d={`M${x1},0 L${x1},15`} stroke="white" />
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

        let prev = <></>;
        if (i === 0) {
          prev = <path stroke="white" d={`M${x0},15 L${x0},30`} />;
        }

        const mid = (x0 + x1) * half;
        return (
          <Fragment key={i}>
            {prev}
            <text x={mid - textOffset} fill="white" y={30}>
              {monthNames[m[1]]}
            </text>
            <path stroke="white" d={`M${x1},15 L${x1},30`} />
          </Fragment>
        );
      })}
    </>
  );
};
