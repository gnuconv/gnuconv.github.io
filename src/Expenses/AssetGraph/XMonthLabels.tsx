import dayjs from "dayjs";
import type { Graph } from "./graph";
import { computeX } from "./utils";

interface XMonthLabelsProps {
  graph: Graph;
}

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

const monthPadding = 2;
const textOffset = 12;

export const XMonthLabels = ({
  graph,
}: XMonthLabelsProps): React.ReactElement => {
  const { dims, xMargins, yMargins, xRange, xMonthslabels } = graph;

  const min = computeX(dims, xMargins, xRange, xRange[0]);
  const max = computeX(dims, xMargins, xRange, xRange[1]);

  return (
    <>
      {xMonthslabels.map((m, i) => {
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
